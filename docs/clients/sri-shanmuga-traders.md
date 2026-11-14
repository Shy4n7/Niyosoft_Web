# Client brief: Sri Shanmuga Traders

Prospective client for a new billing and inventory system ("the advanced version").
This file is internal project notes. It is not part of the website build.

Last updated: 14 November 2026, from a shop visit (photos of the current software and printouts).

---

## 1. The business

- Wholesale and retail grocery trader. Sells rice in 10/26/50 kg bags, dals, masala, jaggery, oils, soaps, snacks.
- Has separate wholesale and retail rates, and two price levels per item.
- Sells on credit to regular customers ("parties"), mostly other shops. Shyan's family shop used to buy from them.
- Does deliveries.
- Bills say "GOD IS LOVE" at the top and "வாழ்க வளமுடன்" at the bottom.
- Two staff members bill when the owner is away. The owner does not care much about hierarchy.

## 2. Current software

- Windows desktop program, probably Visual Basic. Built by someone described as a "visual designer", who said he is a game developer.
- Runs on Windows 7 (no longer supported).
- Two PCs share one database over the shop's local network. Stock reduces on both when an item is sold.
- Database format unknown. Likely .mdb (Access) or .dbf files. Check the install folder before quoting migration work.

### Screens seen

| Screen | What it does |
| --- | --- |
| Main menu | Item master, party master, billing, purchase, cash, delivery, bill cancel, adjustment, backup, expenses, purchase return, receipt, bank, reports |
| Item master | Location, item, description, Tamil item name, UOM, group, purchase rate, sale rate, retail sale rate, stock, rack, min stock, tax %, barcode, HSN |
| Billing (sales) | Bill no, party, item code, description, qty, rate, amount, total tax, discount, total bill. Buttons: save, clear, previous, next, edit, print, delivery |
| Cash entry | Party, adjustment (+), cash (-), type, balance, bank (e.g. Canara, self), particulars, cash post date (post-dated cheques) |

### Reports it already has

Purchase detail, sales detail, ledger, party balance, bank report, reorder, party-wise purchase and sales, item-wise profit, GST sales and purchase, sales-person report, line-wise sales and balance, all-party balance, item stock, VAT party-wise.

### Printouts

- Customer bill prints as a "Quotation" on a thermal printer, with item names in Tamil.
- Party statements (example: a retail store customer) list bill dates and amounts, a total, and a balance. The customer appears to sign or mark the balance.

## 3. Problems spotted

1. Tamil item names print garbled on bills (old font encoding, not Unicode).
2. Stock goes negative (one item showed -123), so stock figures are not reliable.
3. Calculator, handwritten notes and a "PAID" rubber stamp are used next to the computer: work the software is not doing.
4. Backup is a manual button. A disk failure could lose years of data.
5. VAT reports still exist (VAT was replaced by GST in 2017). Bills print as "Quotation", not a GST invoice.
6. Barcode field exists but is unused. Items are found by typing names.
7. Total tax field showed a nonsense value (339989435): likely bugs.
8. Typo on the main menu ("DELILVERY").

## 4. What they asked for

- "The advanced version" (not specified; needs discovery).
- **Customer reports for regular customers:** balances, purchase history, and more.

## 5. Behaviour and insights

- **Statement book:** printed party statements are kept in a book behind the owner's counter. Likely reason: proof of what each customer agreed they owe, for disputes. Confirm with the owner.
- **Staff bill freely** when the owner is away. Do not add approval steps or strict roles that slow billing.

## 6. Proposed features

### Customer list page
- Name, area, phone, outstanding balance (red if overdue), last purchase date and days since, average monthly purchase, credit limit used.
- Filters: overdue, gone quiet (stopped ordering), top customers, by area or route.

### Customer detail page
- Header: shop, owner, phone, address, customer since, payment terms, credit limit, notes.
- Balance: total outstanding with ageing (0-30, 31-60, 60+ days), last payment, post-dated cheques pending.
- Ledger: every bill and payment with running balance, date range, tap to see items, reprint or WhatsApp.
- What they buy: regular items, usual quantity and frequency, last rate given to this customer, "repeat last order".
- Buying pattern: monthly chart vs last year, "usually orders every N days, last order X days ago".
- Actions: call, new bill, WhatsApp statement, payment reminder with UPI QR, record payment.
- Signed statements tab; "billed by" name on each bill.

### Replacing the statement book
- Statement sent on WhatsApp with a "Confirm balance" button; save who confirmed, when and the amount.
- Or the customer signs on a phone or tablet in the shop.
- Keep printing available; the book becomes a backup.

### Staff without hierarchy
- Staff pick their name or a 4-digit PIN once; every bill records who made it.
- Nothing is blocked. The owner gets a quiet activity log on his phone.
- Optional alerts only for big events: bill cancelled, rate below purchase price, large discount, credit beyond limit.
- Daily closing summary to the owner.

### Other ideas
- Owner phone dashboard: today's sales, cash, outstanding, low stock.
- Automatic monthly WhatsApp statements and payment reminders.
- Customer self-service link to view their own balance and bills.
- Payment behaviour tag per customer (on time, usually late, risky).
- Festival buying memory; collection sheet by area.
- Proper GST invoices with Unicode Tamil; bills as WhatsApp PDF.
- Barcode scanning, Tamil and English search, weighing scale input.
- Block or warn on negative stock; reorder suggestions; expiry and batch tracking; supplier POs on WhatsApp.
- Retailer ordering via WhatsApp or app (reference: Ganesh Department Stores project); delivery tracking.
- Automatic daily cloud backup; works offline and syncs; Tally export.
- Possibly e-invoice and e-way bill, depending on turnover. Check with their accountant.

## 7. Approach

1. Discovery first: spend a busy morning in the shop; ask what takes time, what goes wrong, what is still done on paper, what the owner checks when away, how credit is chased, what the accountant needs.
2. Show a clickable mockup of 3 or 4 ideas and let the owner choose.
3. Phase 1: match current features, fix the problems above, migrate all data (items, parties, balances, history). Phase 2: new features.
4. Pricing: one-time fee plus yearly maintenance (AMC).

## 8. Open questions

- Why exactly do they keep the statement book?
- Database format and where it lives on the two PCs.
- Annual turnover (for GST e-invoice and e-way bill rules).
- Do they want a phone app, or only desktop plus WhatsApp?
- Which accountant or Tally setup do they use?
