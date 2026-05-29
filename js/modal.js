
const animationModal = document.getElementById('animationModal');
const modalTaskTitle = document.getElementById('modalTaskTitle');
const modalGif = document.getElementById('modalGif');

function showAnimationModal(task) {
  modalTaskTitle.innerText = task.text;
  modalGif.src = taskAnimations[task.text];
  animationModal.classList.remove('hidden');
}

function closeAnimationModal() {
  animationModal.classList.add('hidden');
}
