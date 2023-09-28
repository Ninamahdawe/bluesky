const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#game-name').value.trim();
  // TODO: hardcoding userId, replace with correct value
  const  userId = 4;
  const description = document.querySelector('#game-desc').value.trim();

  if (name && description) {
    const response = await fetch(`/api/games`, {
      method: 'POST',
      // TODO: need to add description to body not just name
      body: JSON.stringify({ name, userId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/games/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);
