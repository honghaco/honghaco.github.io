---
layout: post
title: Lossless audio files splitting
categories: [howto]
tags: [software, audio, linux, multimedia]
description: How to use `cuetools` and `shntool` to split lossless audio files that come with metadata from a `.cue` file
fullview: false
comments: false
---

## Install required tools

```bash
$ sudo pacman -S mac flac wavpack cuetools shntool
```

|   | term       |  Description                                                  |
|---|:-----------|---------------------------------------------------------------|
| - | `sudo`     | get root privileges.                                          |
| - | `pacman`   | package manager - whatever depends on your Linux box.         |
| - | `mac`      | decoder/encoder for `APE` files - Monkey Audio.               |
| - | `flac`     | decoder/encoder for `FLAC` files - Free Lossless Audio Codec. |
| - | `wavpack`  | decoder/encoder for `WAV` files.                              |
| - | `cuetools` | cue files processor.                                          |
| - | `shntool`  | audio files splitting tool.                                   |

## Splitting

We'll use `shnsplit` to split audio files. Fire up the command with `-h` (`--help`) option to
get more detail on usage. For those who don't wanna type the `--help` yourself, I've copy&amp;paste
for you [at the bottom of this post](#help).

### Syntax

The syntax to call the tool would be formed as following:

```bash
$ shnsplit -f <the-cue-file> -t %n-%t -D -H -o <output-format> -- \
  <the-lossless-audio-files>
```

- `-f`: specific the `cue` file (look for breakpoints).
- `-t`: specific the output files name format:
  - `%n`: means the track number.
  - `%t`: means the track title.
- `-D`: print out the debugging information (useful for diagnostic if the process get fail).
- `-H`: times format in `h:mm:ss`.
- `-o`: (must) specific the output format, `flac` or `wav` (default - no good, man).
- `--`: indicates that the command's options was over, the rest is files' name to convert.

### <span style="color: red; text-decoration: underline;">Warning:</span>

If your `cue` file comes from Windows, it should
contains the `CRLF` `EOL` marks/terminators, this leads to error when call the tools.

```bash
$ file "The Oriental Angels - Rouge Hot II.cue"
The Oriental Angels - Rouge Hot II.cue: UTF-8 Unicode (with BOM) text, with CRLF line
terminators

$ cuebreakpoints "The Oriental Angels - Rouge Hot II.cue"
bad character '�'
bad character '�'
bad character '�'
96: syntax error
cuebreakpoints: error: unable to parse input file `The Oriental Angels - Rouge Hot II.cue'
```

- **How to fix**: Convert the file from Windows format to Unix format, as below tweak.
You can get this by using `dos2unix`, `vim`, `sed`, `awk`, whatever.

```bash
$ dos2unix <the-cue-file>

$ dos2unix "The Oriental Angels - Rouge Hot II.cue"
dos2unix: converting file The Oriental Angels - Rouge Hot II.cue to Unix format...

$ file "The Oriental Angels - Rouge Hot II.cue"
The Oriental Angels - Rouge Hot II.cue: UTF-8 Unicode text
```

### Example on splitting files

```bash
$ shnsplit -f Zhou\ Zifeng\ -\ Guitar\ -\ Hotel\ California.cue \
  -t %n-%t -D -H -o flac -- Zhou\ Zifeng\ -\ Hotel\ California.ape

# Or, less eyes-hurt looking

$ shnsplit -f "Zhou Zifeng - Guitar - Hotel California.cue" \
  -t %n-%t -D -H -o flac -- "Zhou Zifeng - Hotel California.ape"
```

- If your shell is `zsh`, you should complete the command above in two blinks of eyes. Type
the `shnsplit`, press the `<Space>` then `-f`, input `"cue` then press the `<Tab>`, and so on.
(Auto completion all the things!!)

## Metadata

`shnsplit` does not fill metadata to files for you. You have to do it yourself. Don't worry!
Those kindness Linux-guys have done things for you!

The `cuetools` comes with `cuetag.sh` script. This script is placed in your `$PATH`
when [tools is installing](#install-required-tools).

At time of writing, this script just works great, you call it, and tada, life is so good.
Of course, you can take a look yourself to make sure things work as expected. 
The script should contain the following line, if not, fix it (FLAC tagging):

```bash
$ $EDITOR `which cuetag.sh`
```

```bash
# OUTDATED

METAFLAC="metaflac --remove-vc-all --import-vc-from=-"

# UPDATED

# FLAC tagging
METAFLAC="metaflac --remove-all-tags --import-tags-from=-"
```

### Example on writing tags to files

```bash
$ cuetag.sh <the-cue-file> <audio-files>

$ /usr/bin/cuetag.sh "Zhou Zifeng - Guitar - Hotel California.cue" [0-9]*.flac
```

## Playlist

We have to re-create play list file for new created files, the `cue` is no longer valid
to player.

```bash
$ for aufile in *.flac
do
echo "$aufile" >> "`basename *.cue cue`m3u"
done
```

This line

```bash
`basename *.cue cue`m3u
```

means the new one will be the same name as the `cue`
file except its extension, and MIME, of course.

## Real life operation

### Splitting

- I have a folder which contains multiple files, and the `cue` file indecates that 
there are total 13 tracks in this album (the `wav` file).

![Files](/statics/imgs/160819-ss-01.png)

- There's a small problem. Those `TITLE` instructions' value in the `cue`
show that tracks' title currently included the tracks' number.
We have to remove the track number from title names first, unless you wanna
end up with something like this: `01-01-blah-blah.flac`. No good.

![The cue content](/statics/imgs/160819-ss-02.png)

- It looks better now. And ready to split the `wav` file.

![Title stripped out track number](/statics/imgs/160819-ss-03.png)

- OK. Let's fire the `shnsplit` up.

![shnsplit splitting file](/statics/imgs/160819-ss-04.png)

### Tagging

- The `wav` has been splitted to `flac` files, and these `flac` files do not contain
any metadata yet. The player shows empty tags.

![Empty tags](/statics/imgs/160819-ss-05.png)

- You can fill tags to those new created files manually, but I don't think
it is a good idea.

![Tags browser](/statics/imgs/160819-ss-06.png)

- Now, it's time for `cuetag.sh` turn, let's:

```bash
$ cuetag.sh *.cue [0-9]*.flac
```

- Here is what we get. So nice. Re-create the play list file, and enjoy.

![Tagful the files](/statics/imgs/160819-ss-07.png)

## Help

```text
$ shnsplit -h

Usage: shnsplit [OPTIONS] [file]

Mode-specific options:

  -c num  start counting from num when naming output files (default is 1)
  -e len  prefix each track with len amount of lead-in from previous track (*)
  -f file read split point data from file
  -h      show this help screen
  -l len  split input file into files of length len (*)
  -m str  specify character manipulation string (alternating from/to)
  -n fmt  specify file count output format (default is %02d -- 01, 02, 03, ...)
  -t fmt  name output files in user-specified format based on CUE sheet fields.
          (%p = performer, %a = album, %t = track title, %n = track number)
  -u len  postfix each track with len amount of lead-out from next track (*)
  -x list only extract tracks in list (comma-separated, may contain ranges)

          (*) len must be in bytes, m:ss, m:ss.ff or m:ss.nnn format

If no split point file is given, then split points are read from the terminal.

Global options:

  -D      print debugging information (each one increases debugging level)
  -F file get input filenames from file, instead of command line or terminal
  -H      print times in h:mm:ss.{ff,nnn} format, instead of m:ss.{ff,nnn}
  -O val  overwrite existing files?  val is: {[ask], always, never}
  -P type progress indicator type.  type is: {[pct], dot, spin, face, none}
  -a str  prefix 'str' to base part of output filenames
  -d dir  specify output directory
  -i fmt  specify input file format decoder and/or arguments.
          format is:  "fmt decoder [arg1 ... argN (%f = filename)]"
  -o fmt  specify output file format, extension, encoder and/or arguments.
          format is:  "fmt [ext=abc] [encoder [arg1 ... argN (%f = filename)]]"
  -q      suppress non-critical output (quiet mode)
  -r val  reorder input files?  val is: {ask, ascii, [natural], none}
  -v      show version information
  -w      suppress warnings
  -z str  postfix 'str' to base part of output filenames
  --      indicates that everything following it is a filename

```

Source: [http://en.linuxreviews.org/HOWTO_splitt_lossless_audio_files_(ape,_flac,_wv,_wav)_using_.cue_files]()

