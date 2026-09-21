/* Photo preview + drag and drop */
(function () {
  var input = document.getElementById('petPhoto');
  var drop = document.getElementById('photoDrop');
  var preview = document.getElementById('photoPreview');
  var placeholder = document.getElementById('photoPlaceholder');
  var clear = document.getElementById('photoClear');
  if (!input) return;

  function show(file) {
    if (!file || !file.type.startsWith('image/')) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.alt = 'Photo of your pet';
      preview.hidden = false;
      placeholder.hidden = true;
      clear.hidden = false;
      drop.classList.add('is-filled');
    };
    reader.readAsDataURL(file);
  }
  input.addEventListener('change', function () { show(input.files[0]); });
  ['dragenter', 'dragover'].forEach(function (evt) {
    drop.addEventListener(evt, function (e) { e.preventDefault(); drop.classList.add('is-over'); });
  });
  ['dragleave', 'drop'].forEach(function (evt) {
    drop.addEventListener(evt, function (e) { e.preventDefault(); drop.classList.remove('is-over'); });
  });
  drop.addEventListener('drop', function (e) {
    if (e.dataTransfer.files.length) { input.files = e.dataTransfer.files; show(e.dataTransfer.files[0]); }
  });
  clear.addEventListener('click', function () {
    input.value = '';
    preview.hidden = true;
    preview.removeAttribute('src');
    placeholder.hidden = false;
    clear.hidden = true;
    drop.classList.remove('is-filled');
  });
})();

/* Simple submit feedback so the demo form doesn't reload the page */
document.getElementById('petForm').addEventListener('submit', function (e) {
  e.preventDefault();
  if (!this.checkValidity()) { this.reportValidity(); return; }
  var btn = this.querySelector('.reg__button');
  btn.textContent = 'Registered';
  btn.disabled = true;
});