"""
Niyosoft Technologies: "From Notebook to Next Level"
20 second vertical (9:16) 3D ad for Meta Reels / Stories, built procedurally in Blender.

HOW TO RUN
  Option A (inside Blender): Scripting workspace > Open this file > Run Script.
            Then Render > Render Animation (Ctrl+F12).
  Option B (command line):
            blender -b -P niyosoft_ad_blender.py -- --render
            blender -b -P niyosoft_ad_blender.py -- --save=/path/to/niyosoft_ad.blend
  Tested target: Blender 3.6 LTS and 4.x (Eevee). Needs no add-ons and no external assets.

WHAT IT BUILDS
  A generic wholesale shop (no real client names or logos), a stressed shopkeeper, a growing pile
  of notebooks, the glowing Niyosoft "N" cube, a dashboard made from the flying paper, a phone with
  "New order / Payment received", and a pull-back reveal ending on a branded end card.
  10 cameras are bound to timeline markers, so every shot is a hard cut (see SHOTS below).

NOT INCLUDED
  Audio (music, whoosh, chime) and Tamil text. Blender's 3D text does not shape Tamil script
  reliably, so add Tamil as subtitles in your video editor.

TWEAKING
  Everything you are likely to change is in the SETTINGS block just below.
"""

import math
import os
import random
import sys

import bpy
from mathutils import Matrix, Quaternion, Vector

# ----------------------------------------------------------------------------------------------
# SETTINGS
# ----------------------------------------------------------------------------------------------
FPS = 30
TOTAL_FRAMES = 600                  # 20 seconds
RES_X, RES_Y = 1080, 1920           # 9:16. Use 1080 x 1080 or 1920 x 1080 for feed crops.
QUICK_PREVIEW = True                # True: 50% size, few samples. Set False for the final render.
OUTPUT_PATH = os.path.join(os.path.expanduser("~"), "niyosoft_ad.mp4")

PHONE_NUMBER = "+91 79041 53087"    # from src/lib/site.ts
SITE_URL = "niyosoft.in"
TAGLINE = "Transforming Enterprises\nthrough Digital Innovation"

KEY_DIM = 300.0                     # key light power while the shop is messy (watts)
KEY_BRIGHT = 1100.0                 # key light power after the cube lands (watts)
HIT = 255                           # frame the Niyosoft cube lands (start of the transformation)
CLEAN_DONE = HIT + 35               # frame the room finishes turning bright

RNG_SEED = 7
random.seed(RNG_SEED)


def hexc(h, a=1.0):
    """sRGB hex string to the linear RGBA tuple Blender expects."""
    h = h.lstrip("#")
    r, g, b = (int(h[i:i + 2], 16) / 255.0 for i in (0, 2, 4))

    def lin(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    return (lin(r), lin(g), lin(b), a)


# Palette taken from the website CSS (globals.css)
INK = hexc("0a1240")
NAVY = hexc("0b1a5c")
BRAND = hexc("0a4fd6")
SKY = hexc("18c8e6")
PAPER = hexc("f3f1ec")
WHITE = (1.0, 1.0, 1.0, 1.0)
GREEN = hexc("22c55e")
RED = hexc("e5484d")
CLAY = hexc("d9a68a")

# Dull "before" look vs clean "after" look for the big surfaces
WALL_DULL, WALL_CLEAN = hexc("6b5d4a"), hexc("e6ecf8")
FLOOR_DULL, FLOOR_CLEAN = hexc("4a4036"), hexc("cfdaf0")
COUNTER_DULL, COUNTER_CLEAN = hexc("6a4326"), hexc("f4f7fd")
SHIRT_DULL, SHIRT_CLEAN = hexc("55606f"), BRAND
WORLD_DULL, WORLD_CLEAN = hexc("1a1511"), hexc("9db8ee")

scene = bpy.context.scene


# ----------------------------------------------------------------------------------------------
# Small helpers
# ----------------------------------------------------------------------------------------------
def sec(t):
    """Seconds to frame number (frame 1 is t = 0)."""
    return int(round(t * FPS)) + 1


def smooth(t):
    return t * t * (3.0 - 2.0 * t)


def ease_out(t):
    return 1.0 - (1.0 - t) ** 2


def lerp(a, b, t):
    return Vector(a) + (Vector(b) - Vector(a)) * t


def set_interp(kind):
    try:
        bpy.context.preferences.edit.keyframe_new_interpolation_type = kind
    except Exception:
        pass


def kf(idb, path, frame, value, interp="BEZIER"):
    """Set a property and keyframe it. Works for objects, data blocks and node sockets.
    The interpolation type applies to the segment that STARTS at this key."""
    set_interp(interp)
    target = idb
    parts = path.split(".")
    for p in parts[:-1]:
        target = getattr(target, p)
    setattr(target, parts[-1], value)
    idb.keyframe_insert(data_path=path, frame=frame)


_emit_cache = {}
_mats = {}


def principled(name, color, rough=0.65):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value = color
    b.inputs["Roughness"].default_value = rough
    m.diffuse_color = color
    _mats[name] = m
    return m


def emit(color, strength=1.0):
    key = (tuple(round(c, 4) for c in color), round(strength, 3))
    if key in _emit_cache:
        return _emit_cache[key]
    m = bpy.data.materials.new("Emit%d" % len(_emit_cache))
    m.use_nodes = True
    nt = m.node_tree
    nt.nodes.clear()
    em = nt.nodes.new("ShaderNodeEmission")
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    em.inputs["Color"].default_value = color
    em.inputs["Strength"].default_value = strength
    nt.links.new(em.outputs["Emission"], out.inputs["Surface"])
    m.diffuse_color = color
    _emit_cache[key] = m
    return m


def _finish(ob, name, loc, rot, mat, parent):
    ob.name = name
    ob.location = loc
    ob.rotation_euler = rot
    if mat is not None:
        ob.data.materials.append(mat)
    if parent is not None:
        ob.parent = parent
    return ob


def box(name, loc, dims, mat, rot=(0, 0, 0), origin="center", bevel=0.0, parent=None):
    """Box with the given dimensions. Object scale stays 1 so animated scale pops are clean.
    origin: 'center', 'base' (grows upward when scaled in Z) or 'left' (grows along +X)."""
    bpy.ops.mesh.primitive_cube_add(size=1.0)
    ob = bpy.context.active_object
    sx, sy, sz = dims
    ob.data.transform(Matrix.Diagonal((sx, sy, sz, 1.0)))
    if origin == "base":
        ob.data.transform(Matrix.Translation((0, 0, sz / 2.0)))
    elif origin == "left":
        ob.data.transform(Matrix.Translation((sx / 2.0, 0, 0)))
    _finish(ob, name, loc, rot, mat, parent)
    if bevel:
        m = ob.modifiers.new("Bevel", "BEVEL")
        m.width = bevel
        m.segments = 2
    return ob


def _smooth(ob):
    for p in ob.data.polygons:
        p.use_smooth = True


def cylinder(name, loc, radius, depth, mat, rot=(0, 0, 0), parent=None):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, vertices=32)
    ob = bpy.context.active_object
    _smooth(ob)
    return _finish(ob, name, loc, rot, mat, parent)


def sphere(name, loc, radius, mat, parent=None):
    bpy.ops.mesh.primitive_uv_sphere_add(radius=radius, segments=32, ring_count=16)
    ob = bpy.context.active_object
    _smooth(ob)
    return _finish(ob, name, loc, (0, 0, 0), mat, parent)


def torus(name, loc, major, minor, mat):
    bpy.ops.mesh.primitive_torus_add(major_radius=major, minor_radius=minor,
                                     major_segments=64, minor_segments=12)
    ob = bpy.context.active_object
    return _finish(ob, name, loc, (0, 0, 0), mat, None)


def text(name, body, loc, size, mat, rot=(0, 0, 0), parent=None, extrude=0.0):
    bpy.ops.object.text_add()
    ob = bpy.context.active_object
    ob.name = name
    ob.data.body = body
    ob.data.size = size
    ob.data.align_x = "CENTER"
    ob.data.align_y = "CENTER"
    ob.data.extrude = extrude
    ob.data.materials.append(mat)
    ob.location = loc
    ob.rotation_euler = rot
    if parent is not None:
        ob.parent = parent
    return ob


def empty(name, loc=(0, 0, 0), parent=None, rot=(0, 0, 0)):
    ob = bpy.data.objects.new(name, None)
    bpy.context.collection.objects.link(ob)
    ob.location = loc
    ob.rotation_euler = rot
    if parent is not None:
        ob.parent = parent
    return ob


def pop(ob, f_in, f_out=None, dur=7, interp_in="BACK", final=1.0):
    """Scale an object from 0 to full size at f_in (with a little overshoot), and optionally
    back to 0 at f_out. Before f_in the object stays at scale 0, so it is invisible."""
    kf(ob, "scale", f_in - 1, (0, 0, 0), interp_in)
    kf(ob, "scale", f_in - 1 + dur, (final, final, final), "BEZIER")
    if f_out is not None:
        kf(ob, "scale", f_out - 4, (final, final, final), "BEZIER")
        kf(ob, "scale", f_out, (0, 0, 0), "BEZIER")


def clear_scene():
    for ob in list(bpy.data.objects):
        bpy.data.objects.remove(ob, do_unlink=True)
    for coll in (bpy.data.meshes, bpy.data.materials, bpy.data.cameras, bpy.data.lights,
                 bpy.data.curves):
        for blk in list(coll):
            if blk.users == 0:
                coll.remove(blk)
    scene.timeline_markers.clear()


# ----------------------------------------------------------------------------------------------
# Scene: world, room, lights
# ----------------------------------------------------------------------------------------------
def build_world():
    world = bpy.data.worlds.new("NiyoWorld")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs["Strength"].default_value = 1.0
    kf(bg.inputs[0], "default_value", 1, WORLD_DULL, "LINEAR")
    kf(bg.inputs[0], "default_value", HIT, WORLD_DULL, "BEZIER")
    kf(bg.inputs[0], "default_value", CLEAN_DONE, WORLD_CLEAN, "BEZIER")


def build_room():
    wall = principled("Wall", WALL_DULL, 0.9)
    floor = principled("Floor", FLOOR_DULL, 0.7)
    counter = principled("Counter", COUNTER_DULL, 0.5)
    for mat, dull, clean in ((wall, WALL_DULL, WALL_CLEAN), (floor, FLOOR_DULL, FLOOR_CLEAN),
                             (counter, COUNTER_DULL, COUNTER_CLEAN)):
        sock = mat.node_tree.nodes["Principled BSDF"].inputs["Base Color"]
        kf(sock, "default_value", 1, dull, "LINEAR")
        kf(sock, "default_value", HIT, dull, "BEZIER")
        kf(sock, "default_value", CLEAN_DONE, clean, "BEZIER")

    box("Floor", (0, 0, -0.05), (40, 40, 0.1), floor)
    box("BackWall", (0, 3.3, 6.0), (40, 0.2, 12), wall)

    # Counter: body plus a slightly wider top slab (top surface at z = 1.0)
    box("CounterBody", (0, 0, 0.49), (3.2, 1.4, 0.98), counter, bevel=0.02)
    box("CounterTop", (0, 0, 0.98), (3.3, 1.5, 0.04), counter, bevel=0.01)

    # Shelves with generic stock boxes on the back wall
    jar_cols = [hexc(h) for h in ("c0563b", "d9a441", "4f8a5b", "5b78b5", "9a6fb0")]
    jar_mats = [principled("Jar%d" % i, c, 0.6) for i, c in enumerate(jar_cols)]
    shelf_mat = principled("Shelf", hexc("5b4631"), 0.7)
    for zi, z in enumerate((1.9, 2.8)):
        box("Shelf%d" % zi, (0, 2.95, z), (3.8, 0.4, 0.06), shelf_mat)
        x = -1.7
        while x < 1.7:
            h = random.uniform(0.22, 0.36)
            box("Stock", (x, 2.95, z + 0.03 + h / 2), (0.24, 0.26, h),
                random.choice(jar_mats), bevel=0.02)
            x += random.uniform(0.28, 0.4)


def build_lights():
    key_d = bpy.data.lights.new("Key", "AREA")
    key_d.size = 6.0
    key = bpy.data.objects.new("Key", key_d)
    bpy.context.collection.objects.link(key)
    key.location = (0, -1.0, 6.0)
    warm, cool = hexc("ffb877"), hexc("e8f1ff")
    kf(key_d, "energy", 1, KEY_DIM, "LINEAR")
    kf(key_d, "energy", HIT, KEY_DIM, "BEZIER")
    kf(key_d, "energy", CLEAN_DONE, KEY_BRIGHT, "BEZIER")
    kf(key_d, "color", 1, warm[:3], "LINEAR")
    kf(key_d, "color", HIT, warm[:3], "BEZIER")
    kf(key_d, "color", CLEAN_DONE, cool[:3], "BEZIER")

    fill_d = bpy.data.lights.new("Fill", "AREA")
    fill_d.size = 5.0
    fill = bpy.data.objects.new("Fill", fill_d)
    bpy.context.collection.objects.link(fill)
    fill.location = (0, -7.0, 3.0)
    fill.rotation_euler = (math.radians(70), 0, 0)      # aims toward +Y, slightly down
    kf(fill_d, "energy", 1, 120.0, "LINEAR")
    kf(fill_d, "energy", HIT, 120.0, "BEZIER")
    kf(fill_d, "energy", CLEAN_DONE, 450.0, "BEZIER")


# ----------------------------------------------------------------------------------------------
# Characters and props
# ----------------------------------------------------------------------------------------------
def build_owner():
    clay = principled("Clay", CLAY, 0.6)
    shirt = principled("Shirt", SHIRT_DULL, 0.7)
    sock = shirt.node_tree.nodes["Principled BSDF"].inputs["Base Color"]
    kf(sock, "default_value", 1, SHIRT_DULL, "LINEAR")
    kf(sock, "default_value", HIT, SHIRT_DULL, "BEZIER")
    kf(sock, "default_value", CLEAN_DONE, SHIRT_CLEAN, "BEZIER")
    dark = emit(INK, 1.0)

    owner = empty("Owner", (0, 1.2, 0))
    cylinder("Body", (0, 0, 0.95), 0.32, 1.3, shirt, parent=owner)
    sphere("Head", (0, 0, 1.88), 0.26, clay, parent=owner)
    for sx in (-1, 1):
        sphere("Eye", (sx * 0.09, -0.235, 1.91), 0.035, dark, parent=owner)

    # Eyebrows: worried while stressed, flat after the cube lands
    brows = []
    for sx in (-1, 1):
        b = box("Brow", (sx * 0.09, -0.245, 2.0), (0.12, 0.02, 0.025), dark, parent=owner)
        brows.append((sx, b))
    for sx, b in brows:
        worried = -0.35 if sx < 0 else 0.35
        kf(b, "rotation_euler", 1, (0, worried, 0), "LINEAR")
        kf(b, "rotation_euler", HIT + 3, (0, worried, 0), "BEZIER")
        kf(b, "rotation_euler", HIT + 30, (0, 0, 0), "BEZIER")

    # Mouth: small and flat, then wider (a smile) once things are fixed
    mouth = box("Mouth", (0, -0.248, 1.79), (0.1, 0.02, 0.02), dark, parent=owner)
    kf(mouth, "scale", 1, (0.6, 1, 1), "LINEAR")
    kf(mouth, "scale", HIT + 3, (0.6, 1, 1), "BEZIER")
    kf(mouth, "scale", HIT + 30, (1.9, 1, 1.6), "BEZIER")

    # Slump forward while the paper piles up, stand tall after the cube lands
    kf(owner, "rotation_euler", 1, (0, 0, 0), "BEZIER")
    kf(owner, "rotation_euler", 200, (0.28, 0, 0), "BEZIER")
    kf(owner, "rotation_euler", HIT + 3, (0.30, 0, 0), "BEZIER")
    kf(owner, "rotation_euler", HIT + 30, (-0.02, 0, 0), "BEZIER")
    kf(owner, "rotation_euler", HIT + 45, (0, 0, 0), "BEZIER")

    # Little hops of relief: when the dashboard forms, and when the first order arrives
    for f0 in (HIT + 90, 456):
        kf(owner, "location", f0, (0, 1.2, 0), "BEZIER")
        kf(owner, "location", f0 + 6, (0, 1.2, 0.15), "BEZIER")
        kf(owner, "location", f0 + 12, (0, 1.2, 0), "BEZIER")

    # Arms. The pivot empty rotates about X; the arm points along the pivot's local +Z.
    for name, sx in (("ArmL", -1), ("ArmR", 1)):
        pivot = empty(name, (sx * 0.42, 0, 1.45), parent=owner)
        cylinder(name + "Mesh", (0, 0, 0.35), 0.09, 0.7, shirt, parent=pivot)
        kf(pivot, "rotation_euler", 1, (2.2, 0, 0), "BEZIER")
        kf(pivot, "rotation_euler", HIT + 3, (2.2, 0, 0), "BEZIER")
        kf(pivot, "rotation_euler", HIT + 35, (2.8, 0, 0), "BEZIER")
        if sx < 0:
            # tap the dashboard during the over-the-shoulder shot
            for f, ang in ((404, 2.8), (411, 2.0), (418, 2.8), (426, 2.0), (433, 2.8)):
                kf(pivot, "rotation_euler", f, (ang, 0, 0), "BEZIER")
        else:
            # raise a hand and wave during the pull-back
            kf(pivot, "rotation_euler", 505, (2.8, 0, 0), "BEZIER")
            for f, ang in ((525, 0.35), (535, 0.65), (545, 0.3), (555, 0.65), (566, 0.35)):
                kf(pivot, "rotation_euler", f, (ang, 0, 0), "BEZIER")
    return owner


def build_papers():
    """Notebooks: they pile up while the owner struggles, then fly to the dashboard on the left."""
    cover_cols = [hexc(h) for h in ("a8483c", "c79a3b", "4a7f58", "55709e", "7d6a5a")]
    covers = [principled("Cover%d" % i, c, 0.7) for i, c in enumerate(cover_cols)]
    dims = (0.42, 0.30, 0.05)
    items = []

    # Loose notebooks on the counter (leave room for the "bad bill" and the tower)
    for i in range(38):
        while True:
            x = random.uniform(-1.35, 1.35)
            y = random.uniform(-0.5, 0.5)
            near_bill = (x - 0.5) ** 2 + (y + 0.45) ** 2 < 0.5 ** 2
            in_tower = -1.3 < x < -0.7 and -0.25 < y < 0.45
            if not near_bill and not in_tower:
                break
        z = 1.0 + 0.025 + 0.05 * random.randint(0, 2)
        appear = 1 if i < 12 else random.randint(8, 170)
        items.append((appear, (x, y, z), (0, 0, random.uniform(0, math.pi))))

    # A tower that keeps growing
    for i in range(22):
        x = -1.0 + random.uniform(-0.05, 0.05)
        y = 0.1 + random.uniform(-0.05, 0.05)
        z = 1.0 + 0.027 + i * 0.056
        items.append((20 + i * 8, (x, y, z), (0, 0, random.uniform(-0.4, 0.4))))

    for idx, (appear, rest, rot) in enumerate(items):
        ob = box("Notebook%02d" % idx, rest, dims, covers[idx % len(covers)], rot=rot, bevel=0.006)

        if appear > 1:
            kf(ob, "scale", appear - 7, (0, 0, 0), "CONSTANT")
            kf(ob, "scale", appear - 6, (1, 1, 1), "BEZIER")
            kf(ob, "location", appear - 6, (rest[0], rest[1], rest[2] + 1.2), "BEZIER")
            kf(ob, "location", appear, rest, "BEZIER")

        # Flight to the dashboard grid after the cube lands
        fly0 = HIT + 3 + int(idx * 0.55)
        col, row = idx % 10, idx // 10
        target = (-1.9 + col * 0.19, 0.12, 1.95 + row * 0.2)
        mid = (rest[0] + random.uniform(-0.6, 0.6), rest[1] + random.uniform(-0.8, 0.2),
               rest[2] + 1.3 + random.uniform(0.0, 0.8))
        kf(ob, "location", fly0, rest, "BEZIER")
        kf(ob, "location", fly0 + 12, mid, "BEZIER")
        kf(ob, "location", fly0 + 34, target, "BEZIER")
        kf(ob, "rotation_euler", fly0, rot, "BEZIER")
        kf(ob, "rotation_euler", fly0 + 34, (math.pi / 2, 0, 0), "BEZIER")
        kf(ob, "scale", fly0, (1, 1, 1), "BEZIER")
        kf(ob, "scale", fly0 + 34, (0.42, 0.42, 0.42), "BEZIER")
        kf(ob, "scale", 346, (0.42, 0.42, 0.42), "BEZIER")
        kf(ob, "scale", 358, (0, 0, 0), "BEZIER")

    # The "bad bill" for the macro shot: crossed out, total unknown
    bill_mat = principled("Bill", PAPER, 0.9)
    bill = box("BadBill", (0.5, -0.45, 1.012), (0.5, 0.7, 0.006), bill_mat, rot=(0, 0, 0.2))
    ink = emit(INK, 1.0)
    text("BillText", "TOTAL\n???", (0.5, -0.45, 1.019), 0.08, ink, rot=(0, 0, 0.2))
    red = emit(RED, 2.0)
    for sgn in (-1, 1):
        box("BillCross", (0.5, -0.45, 1.021), (0.46, 0.035, 0.006), red,
            rot=(0, 0, 0.2 + sgn * math.radians(55)))
    return bill


def build_cube():
    """The glowing Niyosoft "N" cube: drops in, shockwave, then floats above the shop."""
    glow = emit(BRAND, 4.0)
    white = emit(WHITE, 3.0)
    cube = box("NiyoCube", (0, 0.1, 7.5), (0.7, 0.7, 0.7), glow, bevel=0.04)
    text("NiyoN", "N", (0, -0.36, 0), 0.5, white, rot=(math.pi / 2, 0, 0), parent=cube,
         extrude=0.01)

    kf(cube, "scale", 1, (0, 0, 0), "CONSTANT")
    kf(cube, "scale", 240, (1, 1, 1), "BEZIER")
    kf(cube, "location", 240, (0, 0.1, 7.5), "BEZIER")
    kf(cube, "location", HIT, (0, 0.1, 1.45), "BEZIER")
    kf(cube, "location", HIT + 4, (0, 0.1, 1.95), "BEZIER")
    kf(cube, "location", HIT + 8, (0, 0.1, 1.45), "BEZIER")
    kf(cube, "location", HIT + 45, (0, 0.1, 1.45), "BEZIER")
    kf(cube, "location", HIT + 80, (0, 0.45, 3.3), "BEZIER")
    kf(cube, "rotation_euler", HIT + 8, (0, 0, 0), "LINEAR")
    kf(cube, "rotation_euler", TOTAL_FRAMES, (0, 0, math.radians(720)), "LINEAR")

    # Shockwave ring along the counter top
    ring = torus("Shockwave", (0, 0.1, 1.02), 1.0, 0.03, emit(SKY, 5.0))
    kf(ring, "scale", HIT - 1, (0, 0, 0), "CONSTANT")
    kf(ring, "scale", HIT, (0.2, 0.2, 0.2), "BEZIER")
    kf(ring, "scale", HIT + 24, (4.0, 4.0, 4.0), "CONSTANT")
    kf(ring, "scale", HIT + 25, (0, 0, 0), "BEZIER")


def build_dashboard():
    """Billing / inventory dashboard that forms from the paper, plus a stock list panel."""
    plate = emit(NAVY, 1.2)
    bar_mat = emit(BRAND, 3.0)
    cyan = emit(SKY, 3.0)
    head_mat = emit(SKY, 2.5)
    green = emit(GREEN, 3.0)
    white = emit(WHITE, 3.0)

    # Main panel (left)
    main = empty("DashMain", (-1.1, 0.25, 2.5))
    pop(main, 336, dur=16)
    heights = [0.2, 0.3, 0.26, 0.4, 0.36, 0.5]
    box("DashPlate", (0, 0, 0), (1.9, 0.04, 1.2), plate, parent=main, bevel=0.008)
    for side in (-1, 1):                       # front and back copies so every camera sees it
        y = side * 0.03
        box("DashHeader", (0, y, 0.48), (1.7, 0.02, 0.14), head_mat, parent=main)
        for i, h in enumerate(heights):
            b = box("DashBar", (-0.7 + i * 0.28, y, -0.45), (0.2, 0.02, h),
                    bar_mat if i % 2 == 0 else cyan, origin="base", parent=main)
            f0 = 360 + i * 6
            kf(b, "scale", f0 - 1, (1, 1, 0.02), "BEZIER")
            kf(b, "scale", f0 + 20, (1, 1, 1), "BEZIER")
        tick = empty("DashTick", (0.62, y, 0.27), parent=main)
        cylinder("TickDisc", (0, 0, 0), 0.13, 0.02, green, rot=(math.pi / 2, 0, 0), parent=tick)
        box("TickA", (-0.045, side * 0.012, -0.01), (0.035, 0.02, 0.07), white,
            rot=(0, math.radians(-45), 0), parent=tick)
        box("TickB", (0.03, side * 0.012, 0.015), (0.035, 0.02, 0.14), white,
            rot=(0, math.radians(45), 0), parent=tick)
        pop(tick, 395, dur=10)

    # Stock list panel (right of the dashboard, above the phone)
    side_panel = empty("DashStock", (1.3, 0.25, 2.65))
    pop(side_panel, 346, dur=16)
    widths = [0.9, 0.65, 0.8, 0.5]
    box("StockPlate", (0, 0, 0), (1.3, 0.04, 0.9), plate, parent=side_panel, bevel=0.008)
    for side in (-1, 1):
        y = side * 0.03
        for i, w in enumerate(widths):
            r = box("StockRow", (-0.5, y, 0.25 - i * 0.17), (w, 0.02, 0.07),
                    bar_mat if i % 2 == 0 else cyan, origin="left", parent=side_panel)
            f0 = 372 + i * 7
            kf(r, "scale", f0 - 1, (0.02, 1, 1), "BEZIER")
            kf(r, "scale", f0 + 18, (1, 1, 1), "BEZIER")


def build_phone():
    body_mat = principled("PhoneBody", hexc("15171f"), 0.35)
    screen = emit(hexc("eef4ff"), 1.6)
    strip = emit(BRAND, 2.5)
    navy_text = emit(NAVY, 1.0)
    green_text = emit(hexc("15803d"), 1.0)

    phone = empty("Phone", (1.4, -0.1, 1.5))
    box("PhoneBody", (0, 0, 0), (0.52, 0.05, 0.95), body_mat, bevel=0.03, parent=phone)
    box("PhoneScreen", (0, -0.027, 0), (0.46, 0.01, 0.86), screen, parent=phone)
    box("PhoneStrip", (0, -0.032, 0.37), (0.46, 0.01, 0.1), strip, parent=phone)
    t1 = text("PhoneNew", "New order", (0, -0.04, 0.12), 0.07, navy_text,
              rot=(math.pi / 2, 0, 0), parent=phone)
    t2 = text("PhonePaid", "Payment\nreceived", (0, -0.04, -0.15), 0.06, green_text,
              rot=(math.pi / 2, 0, 0), parent=phone)
    pop(phone, 444, dur=10)
    pop(t1, 456, dur=8)
    pop(t2, 480, dur=8)
    return phone


# ----------------------------------------------------------------------------------------------
# Cameras, captions and the end card
# ----------------------------------------------------------------------------------------------
def make_camera(name, lens, fstop):
    cd = bpy.data.cameras.new(name)
    cd.lens = lens
    cd.clip_start = 0.03
    cd.clip_end = 500.0
    cd.dof.use_dof = True
    cd.dof.aperture_fstop = fstop
    ob = bpy.data.objects.new(name, cd)
    bpy.context.collection.objects.link(ob)
    return ob


def make_shot(name, f0, f1, path, lens=35, fstop=5.6, roll=(0.0, 0.0), shake=0.0,
              ease="out", step=3):
    """Create a camera that moves along path(t) -> (location, look_at_target), t from 0 to 1.
    The camera is bound to a timeline marker so the shot is a hard cut at frame f0."""
    cam = make_camera(name, lens, fstop)
    prev = None
    frames = list(range(f0, f1, step)) + [f1]
    for f in frames:
        t = (f - f0) / float(max(1, f1 - f0))
        te = smooth(t) if ease == "smooth" else ease_out(t) if ease == "out" else t
        loc, tgt = path(te)
        loc, tgt = Vector(loc), Vector(tgt)
        if shake:
            loc += Vector((random.uniform(-shake, shake), random.uniform(-shake, shake),
                           random.uniform(-shake, shake)))
        d = tgt - loc
        q = d.to_track_quat("-Z", "Y")
        r = roll[0] + (roll[1] - roll[0]) * te
        if r:
            q = q @ Quaternion((0, 0, 1), r)
        e = q.to_euler("XYZ", prev) if prev is not None else q.to_euler("XYZ")
        prev = e
        kf(cam, "location", f, loc, "LINEAR")
        kf(cam, "rotation_euler", f, e, "LINEAR")
        kf(cam.data, "dof.focus_distance", f, max(0.05, d.length), "LINEAR")
    m = scene.timeline_markers.new(name, frame=f0)
    m.camera = cam
    return cam


def caption(cam, lens, body, f0, f1, dist=2.0, y_frac=0.28):
    """White text on a dark plate, parented to the camera so it always sits in the same place."""
    half_h = dist * 18.0 / lens
    lines = body.split("\n")
    longest = max(len(s) for s in lines)
    size = min(half_h * 0.095, half_h * 0.95 / (0.6 * longest))
    t = text("Caption", body, (0, half_h * y_frac, -dist), size, emit(WHITE, 3.0), parent=cam)
    w = longest * size * 0.6 + size * 1.0
    h = len(lines) * size * 1.2 + size * 0.7
    box("CaptionPlate", (0, 0, -0.01), (w, h, 0.002), emit(INK, 1.0), parent=t)
    pop(t, f0 + 3, f1, dur=7)
    return t


def end_card(cam, lens, f0):
    d = 3.0
    pop_f = f0 + 2
    bg = box("EndBg", (0, 0, -d - 0.3), (2.6, 4.6, 0.002), emit(PAPER, 1.0), parent=cam)
    pop(bg, pop_f, dur=4, interp_in="BEZIER")

    # Logo tile with the N
    tile = box("EndTile", (0, 0.95, -d), (0.55, 0.55, 0.01), emit(BRAND, 3.0), parent=cam)
    text("EndN", "N", (0, 0, 0.01), 0.4, emit(WHITE, 3.0), parent=tile)
    pop(tile, pop_f + 2)

    name = text("EndName", "Niyosoft\nTechnologies", (0, 0.36, -d), 0.19, emit(INK, 1.2), parent=cam)
    pop(name, pop_f + 6)
    tag = text("EndTag", TAGLINE, (0, -0.12, -d), 0.065, emit(hexc("4a5378"), 1.2), parent=cam)
    pop(tag, pop_f + 10)
    btn = box("EndBtn", (0, -0.55, -d), (1.5, 0.26, 0.01), emit(BRAND, 3.0), parent=cam, bevel=0.004)
    text("EndBtnText", "WhatsApp us for a free demo", (0, 0, 0.01), 0.058,
         emit(WHITE, 3.0), parent=btn)
    pop(btn, pop_f + 14)
    ph = text("EndPhone", PHONE_NUMBER, (0, -0.92, -d), 0.14, emit(INK, 1.2), parent=cam)
    pop(ph, pop_f + 18)
    url = text("EndUrl", SITE_URL, (0, -1.13, -d), 0.085, emit(hexc("0a86ad"), 1.2), parent=cam)
    pop(url, pop_f + 22)


def build_cameras():
    cams = []

    # Shot 1 (0 to 2 s): overhead, slow push down onto the cluttered counter
    f0, f1 = sec(0), sec(2) - 1
    c = make_shot("Shot01_Overhead", f0, f1,
                  lambda t: (lerp((0, -1.4, 6.6), (0, -1.2, 4.6), t), (0, 0.1, 1.0)),
                  lens=28, fstop=8.0)
    caption(c, 28, "Still running your\nshop on paper?", f0, f1, dist=2.0)
    cams.append(c)

    # Shot 2 (2 to 4 s): low angle with handheld shake, pile towering over the owner
    f0, f1 = sec(2), sec(4) - 1
    c = make_shot("Shot02_LowAngle", f0, f1,
                  lambda t: (lerp((0.6, -2.6, 0.8), (0.2, -2.2, 0.85), t), (-0.2, 0.7, 1.8)),
                  lens=32, fstop=4.0, shake=0.012)
    cams.append(c)

    # Shot 3 (4 to 6 s): macro close-up on the crossed-out bill
    f0, f1 = sec(4), sec(6) - 1
    c = make_shot("Shot03_Macro", f0, f1,
                  lambda t: (lerp((0.5, -1.1, 1.55), (0.45, -0.9, 1.35), t), (0.5, -0.45, 1.03)),
                  lens=50, fstop=2.0)
    caption(c, 50, "Lost bills.\nWrong stock.\nLate payments.", f0, f1, dist=0.8, y_frac=0.3)
    cams.append(c)

    # Shot 4 (6 to 8 s): dutch tilt, quick push in as the owner slumps
    f0, f1 = sec(6), sec(8) - 1
    c = make_shot("Shot04_Dutch", f0, f1,
                  lambda t: (lerp((-1.6, -3.2, 1.7), (-0.9, -2.6, 1.8), t), (0, 0.6, 1.7)),
                  lens=32, fstop=5.6, roll=(0.25, 0.38))
    cams.append(c)

    # Shot 5 (8 to 10 s): wide and locked, the cube lands, zoom to the counter
    f0, f1 = sec(8), sec(10) - 1
    c = make_shot("Shot05_CubeDrop", f0, f1,
                  lambda t: (lerp((0, -6.8, 2.8), (0, -4.8, 2.3), t), (0, 0.3, 1.6)),
                  lens=28, fstop=8.0)
    cams.append(c)

    # Shot 6 (10 to 13 s): orbit around the counter while the paper becomes a dashboard
    f0, f1 = sec(10), sec(13) - 1

    def orbit(t):
        a = math.radians(-140 + 100 * t)         # sweep from front-left to front-right
        r = 5.5 - 0.7 * t
        centre = Vector((0, 0.3, 1.8))
        loc = centre + Vector((r * math.cos(a), r * math.sin(a), 0.4 + 0.6 * t))
        return loc, centre + Vector((0, 0, 0.1))

    c = make_shot("Shot06_Orbit", f0, f1, orbit, lens=30, fstop=6.0, ease="smooth")
    caption(c, 30, "Billing.\nInventory.\nOnline orders.", f0, f1, dist=2.2, y_frac=0.32)
    cams.append(c)

    # Shot 7 (13 to 15 s): over the owner's shoulder at the dashboard
    f0, f1 = sec(13), sec(15) - 1
    c = make_shot("Shot07_OverShoulder", f0, f1,
                  lambda t: (lerp((0.7, 2.5, 2.35), (0.4, 2.1, 2.3), t), (-1.0, 0.2, 2.5)),
                  lens=35, fstop=4.0)
    cams.append(c)

    # Shot 8 (15 to 17 s): dolly in on the phone
    f0, f1 = sec(15), sec(17) - 1
    c = make_shot("Shot08_Phone", f0, f1,
                  lambda t: (lerp((1.4, -2.6, 1.6), (1.4, -1.6, 1.5), t), (1.4, -0.1, 1.5)),
                  lens=40, fstop=3.2)
    caption(c, 40, "Orders and\npayments, online.", f0, f1, dist=1.4, y_frac=0.36)
    cams.append(c)

    # Shot 9 (17 to 19 s): crane up and pull back to reveal the clean, bright shop
    f0, f1 = sec(17), sec(19) - 1
    c = make_shot("Shot09_PullBack", f0, f1,
                  lambda t: (lerp((0, -3.6, 1.7), (0, -9.5, 4.6), t), (0, 0.4, 1.8)),
                  lens=28, fstop=8.0, ease="smooth")
    cams.append(c)

    # Shot 10 (19 to 20 s): static end card, far from the set so nothing intrudes
    f0, f1 = sec(19), TOTAL_FRAMES
    c = make_shot("Shot10_EndCard", f0, f1,
                  lambda t: ((0, -60.0, 1.0), (0, 0, 1.0)), lens=35, fstop=16.0, ease="linear")
    end_card(c, 35, f0)
    cams.append(c)

    scene.camera = cams[0]
    return cams


# ----------------------------------------------------------------------------------------------
# Render settings
# ----------------------------------------------------------------------------------------------
def configure_render():
    scene.frame_start = 1
    scene.frame_end = TOTAL_FRAMES
    scene.render.fps = FPS
    scene.render.resolution_x = RES_X
    scene.render.resolution_y = RES_Y
    scene.render.resolution_percentage = 50 if QUICK_PREVIEW else 100

    for eng in ("BLENDER_EEVEE_NEXT", "BLENDER_EEVEE"):     # 4.2+ name first, then older
        try:
            scene.render.engine = eng
            break
        except TypeError:
            continue

    samples = 16 if QUICK_PREVIEW else 96
    for attr in ("taa_render_samples", "taa_samples"):
        try:
            setattr(scene.eevee, attr, samples)
        except Exception:
            pass
    # Bloom makes the emissive screens and the cube glow (property removed in Blender 4.2)
    for attr, val in (("use_bloom", True), ("bloom_intensity", 0.08), ("use_gtao", True),
                      ("use_ssr", False)):
        try:
            setattr(scene.eevee, attr, val)
        except Exception:
            pass
    try:
        scene.view_settings.view_transform = "Standard"
    except Exception:
        pass

    scene.render.image_settings.file_format = "FFMPEG"
    try:
        scene.render.ffmpeg.format = "MPEG4"
        scene.render.ffmpeg.codec = "H264"
        scene.render.ffmpeg.constant_rate_factor = "HIGH"
        scene.render.ffmpeg.audio_codec = "NONE"
    except Exception:
        pass
    scene.render.filepath = OUTPUT_PATH


# ----------------------------------------------------------------------------------------------
# Main
# ----------------------------------------------------------------------------------------------
def main():
    extra = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else []
    render_now = "--render" in extra
    save_path = next((a.split("=", 1)[1] for a in extra if a.startswith("--save=")), None)

    clear_scene()
    configure_render()
    build_world()
    build_room()
    build_lights()
    build_owner()
    build_papers()
    build_cube()
    build_dashboard()
    build_phone()
    build_cameras()
    scene.frame_set(1)

    print("Niyosoft ad scene built: %d frames at %d fps, %dx%d, output %s"
          % (TOTAL_FRAMES, FPS, RES_X, RES_Y, OUTPUT_PATH))

    if save_path:
        bpy.ops.wm.save_as_mainfile(filepath=save_path)
    if render_now:
        bpy.ops.render.render(animation=True)


main()
