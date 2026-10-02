# Preload the site-header tickers

The header content is stored in two documents in the `udbptroj` / `production` dataset:

- **Header Updates** (`_type: "headerUpdates"`, document ID `header-updates`)
- **Header Quick Links** (`_type: "headerQuicklinks"`, document ID `header-quicklinks`)

Each document has an `items` array. Each item has `text`, an optional `link`, and an **Active** switch. Sanity creates an `_key` for each array item in Studio; no numeric `id` needs to be entered. When importing raw JSON, include a unique `_key` for each item. An item whose `isActive` is `false` is omitted from the website ticker.

## Test documents already added

One clearly labeled test item has been created in each document so you can verify the integration:

- `TEST — Sanity updates ticker (remove after testing)`
- `TEST — Sanity quick links ticker (remove after testing)`

Both link to `https://example.com` and are active. Remove or replace them after testing.

## Preload the existing website JSON

The current source JSON files are:

- `../vkcet/public/data/header_announcement/recruitments.json` — Updates ticker
- `../vkcet/public/data/header_announcement/announcement_header.json` — Quick Links ticker

They use this shape:

```json
{
  "items": [
    {
      "id": 1,
      "text": "Example announcement",
      "link": "https://example.com"
    }
  ]
}
```

To preload through Studio, open **Header Updates** and **Header Quick Links**, copy each source file's `items` into the matching document, and publish. The source JSON's numeric `id` is not a Sanity field—Sanity generates the array item's key. If a source item's `link` is an empty string, leave the Link field blank. Leave **Active** on for items you want displayed.

## Bulk import example

For a CLI import, make a newline-delimited JSON file (`header-tickers.ndjson`) with one Sanity document per line. Example with one item in each document:

```ndjson
{"_id":"header-updates","_type":"headerUpdates","title":"Header Updates","items":[{"_key":"update-1","text":"Example announcement","link":"https://example.com","isActive":true}]}
{"_id":"header-quicklinks","_type":"headerQuicklinks","title":"Header Quick Links","items":[{"_key":"quicklink-1","text":"Example quick link","link":"https://example.com","isActive":true}]}
```

From this Studio project folder, authenticate with the Sanity CLI if needed, then import:

```powershell
npx sanity datasets import .\header-tickers.ndjson --dataset production --project-id udbptroj --replace
```

`--replace` updates documents with those IDs, including replacing their `items` arrays. The two test documents use these IDs, so a bulk import with the same IDs replaces the test items with the imported content. Review the file and document IDs before running the command. Do not use `--replace` for unrelated or existing production document IDs unless replacement is intended.

This preload is a one-time migration. After publishing/importing, edit and publish ticker items in Sanity Studio. The website's JSON files remain only as a fallback when the corresponding Sanity document does not exist.
