import React from 'react';

function Perfil() {
  const usuario = {
    nombre: 'Juan Pérez',
    email: 'juan@example.com',
  };

  return (
    <div className="Formulario">
      <h2>Perfil de Usuario</h2>
      <p><strong>Nombre:</strong> {usuario.nombre}</p>
      <p><strong>Correo:</strong> {usuario.email}</p>
      <button>Editar perfil</button>
    </div>
  );
}

export default Perfil;

