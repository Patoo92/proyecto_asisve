const telefonoInput = document.getElementById('phone');
const telefonoError = document.getElementById('telefono-error');

telefonoInput.addEventListener('input', function (e) {
  let valor = e.target.value.replace(/\D/g, '');

  // Limitar a 9 dígitos
  valor = valor.slice(0, 9);

  // Formatear: 612 345 678
  if (valor.length > 6) {
    valor = `${valor.slice(0, 3)} ${valor.slice(3, 6)} ${valor.slice(6)}`;
  } else if (valor.length > 3) {
    valor = `${valor.slice(0, 3)} ${valor.slice(3)}`;
  }

  e.target.value = valor;

  const valido = telefonoInput.checkValidity();
  telefonoError.style.display = valido || !telefonoInput.value ? 'none' : 'inline';
});

telefonoInput.addEventListener('blur', () => {
  const valido = telefonoInput.checkValidity();
  telefonoError.style.display = valido || !telefonoInput.value ? 'none' : 'inline';
});
