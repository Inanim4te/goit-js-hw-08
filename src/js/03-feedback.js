import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const storedFeedbackObj = localStorage.getItem('feedback-form-state');
const parsedFeedbackObj = JSON.parse(storedFeedbackObj);

let feedbackObj = {};

if (storedFeedbackObj !== null) {
  if (parsedFeedbackObj.email !== undefined) {
    document.querySelector('input').value = parsedFeedbackObj.email;
  }
  if (parsedFeedbackObj.message !== undefined) {
    document.querySelector('textarea').value = parsedFeedbackObj.message;
  }
  feedbackObj = parsedFeedbackObj;
}

const feedbackHolder = e => {
  if (e.target.name === 'email') {
    feedbackObj.email = e.target.value;
  } else if (e.target.name === 'message') {
    feedbackObj.message = e.target.value;
  }
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackObj));
};

feedbackForm.addEventListener('input', throttle(feedbackHolder, 500));

feedbackForm.addEventListener('submit', e => {
  e.preventDefault();
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
  console.log(feedbackObj);
});
