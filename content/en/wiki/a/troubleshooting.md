---
title: "Troubleshooting"
description: "Solutions to common problems."
lead: "Solutions to common problems."
date: 2022-09-20T00:00:00+00:00
lastmod: 2022-09-20T00:00:00+00:00
draft: false
images: []
menu: 
  docs:
    parent: "help"
weight: 620
toc: true
---

## Problems updating npm packages

Delete the `./node_modules` folder, and run again:

```bash
npm install
```

## Problems with cache

Delete the temporary directories:

```bash
npm run clean
```
