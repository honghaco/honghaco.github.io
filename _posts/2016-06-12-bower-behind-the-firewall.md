---
layout: post
title: Bower behind the firewall 
categories: [til]
tags: [software, development, git, bower]
description: If you find yourself behind a firewall that does not allow for the `git://[repo]`
protocol, there is a fix for this.
fullview: false
comments: false
---

Source: From the [Bower behind the firewall] section of the [Node, Express and libsass:
project from scratch
workshop](https://www.gitbook.com/book/anotheruiguy/nodeexpreslibsass_from-scratch/details) book,
on the [gitbooks.com](https://gitbooks.com).

First, I suggest maually doing a clone using the `https://[repo]` protocol to make
sure that this is really the issue. If the `https://[repo]` protocol works, then
you may want to make the following update:

```bash
git config --global url."https://"
```

Thank you [Stack
Overflow!](http://stackoverflow.com/questions/15669091/bower-install-using-only-https)

