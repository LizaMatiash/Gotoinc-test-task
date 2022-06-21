let encrypt = document.getElementById('encrypt');
let decrypt = document.getElementById('decrypt');
let findWords = document.getElementById('findWords');
let answer = document.getElementById('answer');
let answer2 = document.getElementById('answer2');

function RightEntering(cipher, n) {
  if (cipher == 0 || cipher == null || cipher.toLowerCase() == 'null') {
    answer.innerHTML = `<h2>Введений рядок некоректний. Результат: ${cipher}</h2>`;
    return false;
  } else if (n <= 0 || n == null || n.toLowerCase() == 'null') {
    answer.innerHTML = `<h2>Введена кількість операцій некоректна. Результат: ${cipher}</h2>`;
    return false;
  } else if (cipher.length % 2 !== 0) {
    answer.innerHTML = `<h2>Введений рядок має бути парної довжини</h2>`;
    return false;
  } else {
    answer.innerHTML = `<h2 class="invisible">Answer goes here</h2>`;
    return true;
  }
}

function BubbleSort(arr) {
  for (var i = 0, endI = arr[1].length - 1; i < endI; i++) {
    var wasSwap = false;
    for (var j = 0, endJ = endI - i; j < endJ; j++) {
      if (arr[1][j] > arr[1][j + 1]) {
        var swap0 = arr[0][j];
        var swap1 = arr[1][j];
        arr[0][j] = arr[0][j + 1];
        arr[1][j] = arr[1][j + 1];
        arr[0][j + 1] = swap0;
        arr[1][j + 1] = swap1;
        wasSwap = true;
      }
    }
    if (!wasSwap) break;
  }
  return arr[0];
}

// Приклад для вводу abcdefghij 1 => bdfhjacegi
if (encrypt) {
  encrypt.addEventListener('click', function(event) {
    event.preventDefault();
    let cipher = document.getElementById('cipher').value;
    let n = document.getElementById('n').value;
    if (RightEntering(cipher, n)) {
      do {
        splitCipher = cipher.split('');
        oddMassive = [];
        evenMassive = [];
        for (var i = 0; i < splitCipher.length; i++) {
          if (i % 2 == 0) {
            evenMassive.push(splitCipher[i]);
          } else {
            oddMassive.push(splitCipher[i]);
          }
        }
        cipher = oddMassive.join('') + evenMassive.join('');
        n -= 1;
      } while (n > 0);
      answer.innerHTML = `<h2>Результат: ${cipher}</h2>`;
    }
  })
}

// Приклад для вводу bdfhjacegi 1 => abcdefghij
if (decrypt) {
  decrypt.addEventListener('click', function(event) {
    event.preventDefault();
    let cipher = document.getElementById('cipher').value;
    let n = document.getElementById('n').value;
    if (RightEntering(cipher, n)) {
      do {
        splitCipher = cipher.split('');
        rightMassive = [];
        for (var i = 0; i < (splitCipher.length / 2); i++) {
          rightMassive.push(splitCipher[i + (splitCipher.length / 2)]);
          rightMassive.push(splitCipher[i]);
        }
        cipher = rightMassive.join('');
        n -= 1;
      } while (n > 0);
      answer.innerHTML = `<h2>Результат: ${cipher}</h2>`;
    }
  })
}

// Приклад для вводу  Як тебе не любити, як любити Києве мій
if (findWords) {
  findWords.addEventListener('click', function(event) {
    event.preventDefault();
    let textRow = document.getElementById('textRow').value;
    textRow = textRow.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(' ');
    let textRowCopy = textRow.slice();
    let uniqWords = [
      [],
      []
    ];
    let counter = 0;

    for (var i = 0; i < textRow.length; i++) {
      let uniqWord = textRow[i];
      counter = 0;
      for (var j = 0; j < textRowCopy.length; j++) {
        if (uniqWord == textRowCopy[j]) {
          textRowCopy[j] = 0;
          counter += 1;
          if (counter == 1) {
            uniqWords[0].push(uniqWord);
          }
        }
      }
      if (counter !== 0) {
        uniqWords[1].push(counter);
      }
    }

    if (uniqWords[0].length < 3) {
      uniqWords = [];
      answer2.innerHTML = `<h2>Кількість унікальних слів менша 3. Результат: ${uniqWords}</h2>`;
    } else {
      uniqWords = BubbleSort(uniqWords).reverse();
      answer2.innerHTML = `<h2>Результат: ${ uniqWords.slice(0, 3)}</h2>`;
    }
  })
}
