---
layout: post
title: Exporting Facebook saved links to list
categories: [trick]
tags: [software, facebook, scripts]
description: How to use export the Facebook saved links to a plain text file
fullview: false
comments: true
---

## Full quotation from Oscar Cassetti on Quota.

---

I was in a similar situation but I only wanted the links to be saved into a plain text file. There is no such feature in Facebook the API so I had to resort to a bit a data wrangling. First I saved the page as HTML from my browser then I wrote a simple script that parse the page.

### The script

```ruby
#!/usr/bin/env ruby 
 
require 'nokogiri'
require 'uri'
require 'cgi'
 
input_file = ARGV[0]
 
page = Nokogiri.HTML(File.read(input_file))
page.xpath("//div[@class='_4bl9 _5yjp']").each() do |d|
 raw_link = d.xpath("a")[0].attributes["href"].value
 link = URI(raw_link)
 query_string = link.query
 if query_string.nil?
 puts link
 else
 puts CGI.parse(query_string)["u"]
 end
end
```

This prints out the links you saved.  In the same fashion you can call the Pocket API and add the link rather than printing it out 

---

## Procedure

- Save the code above to a text file, name it something similar to `facebook-export-saved-list.rb`.
- Make it excutable. Ex: `chmod a+x facebook-export-saved-list.rb`.
- On your browser, go to [facebook.com/saved](https://www.facebook.com/saved) page, save it as an `html` file, ex: `Saved.html`.
- Run the script:
```bash
/path/to/the/script /path/to/the/html/file > /path/to/the/text/file
```
Ex:
```bash
~/script/170104-facebook-saved-list-exporting.rb ~/Downloads/Saved.html > ~/MegaSave/170104-facebook-saved-link.md
```

**THE END**

Source: [https://www.quora.com/How-can-I-export-all-my-Facebook-saved-read-it-later-links](https://www.quora.com/How-can-I-export-all-my-Facebook-saved-read-it-later-links)

