var suggestions = document.getElementById('suggestions');
var search = document.getElementById('search');
var blurOverlay = document.getElementById('blurOverlay');

const MAX_DESCRIPTION_LENGTH = 120;

if (search !== null) {
  document.addEventListener('keydown', inputFocus);
}

function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
    blurOverlay.style.display = 'none';
  }
}

document.addEventListener('click', function(event) {

  var isClickInsideElement = suggestions.contains(event.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none');
  }

  blurOverlay.style.display = 'none';
});

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/

document.addEventListener('keydown',suggestionFocus);

function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }

}

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/

(function(){
  var languages = ['en', 'de', 'fr', 'es', 'ru', 'ja', 'zh'];
  var lang = window.location.pathname.split('/')[1];
  if (!languages.includes(lang)) {
    lang = 'en';
  }
  var searchIndexURL = '/' + (lang === 'en' ? '' : lang + '/') + 'searchindex.json';

  var index = new FlexSearch.Document({
        tokenize: "forward",
        cache: 100,
        document: {
            id: 'id',
            store: [
                "href", "title", "description"
            ],
            index: ["title", "description", "content"]
        }
  });

  fetch(searchIndexURL)
        .then(response => response.json())
        .then(data => {
            data.forEach(function(doc) {
                index.add(doc);
            });

            search.addEventListener('input', show_results, true);
   });

  function show_results(){
    const maxResult = 7;
    var searchQuery = this.value;
    var lang = window.location.pathname.split('/')[1];
    var results = index.search(searchQuery, {limit: maxResult, enrich: true});

    var translations = {
      en: 'No results for "<strong>${searchQuery}</strong>"',
      de: 'Keine Ergebnisse für "<strong>${searchQuery}</strong>"',
      fr: 'Aucun résultat pour "<strong>${searchQuery}</strong>"',
      es: 'Sin resultados para "<strong>${searchQuery}</strong>"',
      ru: 'Нет результатов для "<strong>${searchQuery}</strong>"',
      ja: '"<strong>${searchQuery}</strong>" の検索結果はありません',
      zh: '没有找到"<strong>${searchQuery}</strong>"的结果'
    };

    const flatResults = new Map();
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }

    suggestions.innerHTML = "";
    suggestions.classList.remove('d-none');
    blurOverlay.style.display = 'block';

    if (flatResults.size === 0 && searchQuery) {
      const noResultsMessage = document.createElement('div');
      const translation = translations[lang] || translations['en'];
      noResultsMessage.innerHTML = translation.replace('${searchQuery}', searchQuery);
      noResultsMessage.classList.add("suggestion__no-results");
      suggestions.appendChild(noResultsMessage);
      return;
    }

    for(const [href, doc] of flatResults) {
        const entry = document.createElement('div');
        suggestions.appendChild(entry);

        const a = document.createElement('a');
        a.href = href;
        entry.appendChild(a);

        const title = document.createElement('span');
        title.textContent = doc.title;
        title.classList.add("suggestion__title");
        a.appendChild(title);

        const description = document.createElement('span');
        description.textContent = truncateDescription(doc.description);
        description.classList.add("suggestion__description");
        a.appendChild(description);

        suggestions.appendChild(entry);

        if(suggestions.childElementCount == maxResult) break;
    }

    function truncateDescription(text) {
      if (text.length <= MAX_DESCRIPTION_LENGTH) {
          return text;
      } else {
          return text.slice(0, MAX_DESCRIPTION_LENGTH) + '...';
      }
    }
  }
}());
