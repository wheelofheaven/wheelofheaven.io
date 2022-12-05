# How to contribute

The web project is still in heavy development. Things still ought to change a lot. As of now, where we could use some help is with translation work.

## Languages of interest

The primary language of content creation is English. All content is therefore written in English first. For now, we are planning on fully translating the original content from English into the following languages, in that order:

- German
- French
- Spanish
- Japanese
- Russian
- Chinese

## How it works

We use a static page generator that generate html markup language from markdown markup language. These files contain the content written in English that need to be translated. Open one of these content files that you want to translate. If it doesn't exist, create it with the same naming as in English. Commit the change through git and open a pull request which we're going to approve if the translations are meeting our requirements of quality.


### Content structure

The project is structured in the way as the Hugo static page generator expects it to be. There are some additionnal directories that are of now interest in terms of content translation and/or editing. All content is found in the `content` directory in the root folder. Inside that `content` directories, all the languages are to be found.

```
 content/
├──  de
│  ├──  _index.md
│  └──  intro
├──  en
│  ├──  _index.md
│  ├──  articles
│  ├──  contact
│  ├──  contributors
│  ├──  intro
│  ├──  privacy-policy
│  ├──  resources
│  ├──  topics
│  ├──  types
│  └──  wiki
├──  es
│  ├──  _index.md
│  └──  intro
├──  fr
│  ├──  _index.md
│  └──  intro
├──  ja
│  ├──  _index.md
│  └──  intro
├──  ru
│  ├──  _index.md
│  └──  intro
└──  zh
   ├──  _index.md
   └──  intro
```

As mentioned earlier, English is the blueprint so to speak for all content that needs to be translated. Therefore, if a given content file in the `content/en/` subdirectory needs to be translated, then the very same content file needs to be present (if it doesn't exist at the time of translsation, create it in the very same structure and naming convention) in the target language subdirectory, ie. `content/de/`.

Let's assume somebody wants to translate `content/en/intro/at-a-glance/wheel-of-heaven.md` into Russian, a file with the very same hierarchical structure needs to sit inside the `content/ru/` subdirectory, which would look like `content/ru/intro/at-a-glance/wheel-of-heaven.md`. Please note that the file themselves need to be named the same way as in English even if the naming itself remains in English. The static site generator build is going to recognize them as being part of the same content tree and will link them accordingly, meaning that a language switch with the header switch element is going to effectively choose the appropriate translation.

## How to submit translated content requests

Let's assume you have identified the file you want to translate. Open or create that file if doesn't exist yet that you want to translate. Commit the change through git and open a pull request which we're going to approve if the translations are meeting our requirements of quality.

## How to submit correction/modification requests

Same process as described in the last point. Please, open a pull request for any modification request that you deem important.
