fetch('Assets/sobreMim.json')
  .then(res => res.json())
  .then(sobreMim => {
    document.getElementById('profile-name').textContent = sobreMim.name;
    document.getElementById('profile-pic').src = sobreMim.photoUrl;;
    document.getElementById('profile-description').textContent = sobreMim.about;
  })
  .catch(err => console.error('Erro ao carregar dados:', err));
