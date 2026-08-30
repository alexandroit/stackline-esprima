(function () {
  'use strict';

  var form = document.getElementById('parser-form');
  var sourceInput = document.getElementById('source-input');
  var resultOutput = document.getElementById('result-output');
  var status = document.getElementById('status');
  var exampleSelect = document.getElementById('example-select');
  var jsxOption = document.getElementById('jsx-option');
  var rangeOption = document.getElementById('range-option');
  var locationOption = document.getElementById('location-option');

  var examples = {
    script: 'const answer = (value = 40) => value + 2;',
    module: 'export default function answer(value = 40) {\n  return value + 2;\n}',
    jsx: 'const view = <Result value={answer} />;',
    tokens: 'const answer = 40 + 2;'
  };

  function selectedMode() {
    return form.querySelector('input[name="mode"]:checked').value;
  }

  function analyze() {
    var options = {
      jsx: jsxOption.checked,
      range: rangeOption.checked,
      loc: locationOption.checked,
      tokens: selectedMode() !== 'tokens'
    };

    try {
      var result;
      if (selectedMode() === 'tokens') {
        result = esprima.tokenize(sourceInput.value, options);
      } else if (selectedMode() === 'module') {
        result = esprima.parseModule(sourceInput.value, options);
      } else {
        result = esprima.parseScript(sourceInput.value, options);
      }
      resultOutput.textContent = JSON.stringify(result, null, 2);
      status.textContent = selectedMode() === 'tokens' ? result.length + ' tokens' : result.body.length + ' top-level nodes';
      status.className = '';
    } catch (error) {
      resultOutput.textContent = JSON.stringify({
        name: error.name,
        message: error.message,
        lineNumber: error.lineNumber,
        column: error.column,
        index: error.index
      }, null, 2);
      status.textContent = 'Syntax error';
      status.className = 'error';
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    analyze();
  });

  exampleSelect.addEventListener('change', function () {
    var name = exampleSelect.value;
    sourceInput.value = examples[name];
    jsxOption.checked = name === 'jsx';
    var mode = name === 'module' ? 'module' : (name === 'tokens' ? 'tokens' : 'script');
    form.querySelector('input[name="mode"][value="' + mode + '"]').checked = true;
    analyze();
  });

  analyze();
}());
