function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min;
  return Math.floor(r);
}

function randomWord(array) {
  const index = randomNumber(0, array.length);
  return array[index];
}

function generateAdjective() {
  const adjective = randomWord(adjectives);

  document.getElementById('adjective').innerHTML = adjective;
}

function generateCurseWord() {
  const insultSeverityLevels = Object.keys(curseWords2);
  const currentInsultLevel = localStorage.getItem('insultLevel');
  const currentInsultLevelIndex = currentInsultLevel
    ? insultSeverityLevels.indexOf(currentInsultLevel)
    : -1;

  const severityIndex =
    currentInsultLevelIndex != -1
      ? currentInsultLevelIndex
      : randomNumber(0, insultSeverityLevels.length);
  const curseWord = randomWord(
    curseWords2[insultSeverityLevels[severityIndex]]
  );

  document.getElementById('curse-word').innerHTML = curseWord;
  generateInsultSeverity(severityIndex);
}

function generateNoun() {
  const noun = randomWord(nouns);

  document.getElementById('noun').innerHTML = noun;
}

function generateInsult() {
  generateAdjective();
  generateCurseWord();
  generateNoun();
}

function updateClipboard() {
  const adjective = document.getElementById('adjective').innerHTML;
  const curseWord = document.getElementById('curse-word').innerHTML;
  const noun = document.getElementById('noun').innerHTML;
  document.getElementById('clipboard').innerHTML = (
    adjective +
    ' ' +
    curseWord +
    ' ' +
    noun
  ).replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
}

function copyClipboard() {
  updateClipboard();
  /* Get the text field */
  const copyText = document.getElementById('clipboard');

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  document.execCommand('copy');

  /* Alert the copied text */
  var tooltip = document.getElementById('myTooltip');
  tooltip.innerHTML = 'Copied: ' + copyText.value;
  tooltip.classList.add('active');
}

function resetClipboard() {
  var tooltip = document.getElementById('myTooltip');
  tooltip.innerHTML = 'Copy to clipboard';
  tooltip.classList.remove('active');
}

function toggleTheme() {
  var element = document.getElementsByTagName('body')[0];
  localStorage.setItem(
    'theme',
    element.classList.contains('retro') ? 'default' : 'retro'
  );
  element.classList.toggle('retro');
  loadingSpinner();
}

function onLoad() {
  var element = document.getElementsByTagName('body')[0];
  element.classList.add(localStorage.getItem('theme'));
  setActiveInsultLevel();
  generateInsult();
  loadingSpinner();
}

function loadingSpinner() {
  var element = document.getElementsByTagName('body')[0];
  element.classList.add('loading');

  setTimeout(function () {
    element.classList.remove('loading');
  }, 500);
}

function generateInsultSeverity(severityIndex) {
  const insultSeverities = ['Minor', 'Moderate', 'Serious', 'Critical'];
  const insultColours = ['#9EE493', '#f0d76a', '#F0B66A', '#F25767'];

  const meter = document.getElementById('insult-meter');
  const fills = document.getElementsByClassName('insult-meter-fill');
  const severity = document.getElementById('insult-severity');
  const labels = document.getElementsByClassName('word-label');

  // fill.style.backgroundColor = insultColours[severityIndex];
  meter.style.width =
    ((severityIndex + 1) / insultSeverities.length) * 100 + '%';
  severity.innerText = insultSeverities[severityIndex] + ' Insult';
  severity.style.color = insultColours[severityIndex];

  for (let i = 0; i < labels.length; i++) {
    labels[i].style.backgroundColor = insultColours[severityIndex];
  }

  meter.innerHTML = '';

  for (let i = 0; i < (severityIndex + 1) * 5; i++) {
    meter.innerHTML += '<div class="insult-meter-fill"></div>';
  }

  for (let i = 0; i < fills.length; i++) {
    fills[i].style.backgroundColor = insultColours[severityIndex];
  }
}

function sortWords(insultLevel) {
  const severityButtons = document.getElementsByClassName(
    'severity-level-button'
  );

  const severityButton = document.getElementById(insultLevel);

  for (let i = 0; i < severityButtons.length; i++) {
    severityButtons[i].classList.remove('active');
  }

  severityButton.classList.toggle('active');
  localStorage.setItem('insultLevel', insultLevel);

  const activeSeverityButtons = document.getElementsByClassName(
    'severity-level-button active'
  );

  if (activeSeverityButtons.length == 0) {
    document.getElementById('any').classList.add('active');
  }

  if (insultLevel != 'any') {
    document.getElementById('any').classList.remove('active');
  } else {
    for (let i = 0; i < severityButtons.length; i++) {
      severityButtons[i].classList.remove('active');
    }
    document.getElementById('any').classList.add('active');
  }

  // const filteredCurseWords = JSON.parse(
  //   localStorage.getItem('filteredCurseWords')
  // );
  // const modifiedInsultLevel =
  //   filteredCurseWords && filteredCurseWords[insultLevel]
  //     ? filteredCurseWords[insultLevel]
  //     : [];
  // const curseWord = document.getElementById('curse-word').innerHTML;
  // modifiedInsultLevel.push(curseWord);
  // const modifiedCurseWords = {
  //   ...filteredCurseWords,
  //   [insultLevel]: modifiedInsultLevel,
  // };
  // localStorage.setItem(
  //   'filteredCurseWords',
  //   JSON.stringify(modifiedCurseWords)
  // );
  // let remainingCurseWords = JSON.parse(
  //   localStorage.getItem('remainingCurseWords')
  // );
  // remainingCurseWords =
  //   remainingCurseWords != null ? remainingCurseWords : curseWords;
  // const newRemainingCurseWords = remainingCurseWords.filter(
  //   (e) => e !== curseWord
  // );
  // localStorage.setItem(
  //   'remainingCurseWords',
  //   JSON.stringify(newRemainingCurseWords)
  // );
  // generateCurseWord(remainingCurseWords);
  // console.log(remainingCurseWords.length);
}

function setActiveInsultLevel() {
  const insultLevel = localStorage.getItem('insultLevel');
  let severityButton = document.getElementById(insultLevel);

  if (severityButton == null) {
    severityButton = document.getElementById('any');
  }

  if (severityButton != null) {
    severityButton.classList.add('active');
  }
}
