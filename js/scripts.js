/* Eddy Ntambwe
 * This work is based on Julian Garnier's (juliangarnier.com) work and licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc/4.0/.
 * Copyright (c) 2024 Eddy Ntambwe
 */

window.onload = () => {

  const messagesEl = document.querySelector('.messages');
  const typingSpeed = 20;
  const loadingText = '<b>•</b><b>•</b><b>•</b>';
  let messageIndex = 0;

  const getCurrentTime = () => {
    const date = new Date();
    const hours =  date.getHours();
    const minutes =  date.getMinutes();
    const current = hours + (minutes * .01);
    if (current >= 5 && current < 19) return 'Have a nice day';
    if (current >= 19 && current < 22) return 'Have a nice evening';
    if (current >= 22 || current < 5) return 'Have a good night';
  }

  const messages = [
    'Hey there 👋',
    'I\'m Eddy Ntambwe, a web developer based in Sweden',
    'I am passionate about web development and mostly front-end development',
    'photo:img/eddy2.jpeg',
    'Right now I am working on a project called <a target="_blank" href="https://app.skauti.io">Skauti</a>',
    'It\'s a web application that allows users to scout for local small businesses in their area.',
    'It\'s currently in active development but you can check it out <a target="_blank" href="https://app.skauti.io">here</a>',
    'If you are a small business owner and you want to be listed on Skauti, you can <a target="_blank" href="https://portal.skauti.io/">register</a> for free via the portal',
    'You can contact me via:',
    'Email: <a target="_blank" href="mailto:eddydarell@gmail.com">eddydarell@gmail.com</a>',
    'LinkedIn: <a target="_blank" href="https://www.linkedin.com/in/eddy-ntambwe-31b785b7/">LinkedIn</a>',
    'GitHub: <a target="_blank" href="https://github.com/eddydarell">GitHub</a>',
    'Twitter: <a target="_blank" href="https://twitter.com/eddydarell">X fka Twitter</a>',
    'This website is inspired by the work of <a target="_blank" href="https://juliangarnier.com">Julian Garnier</a> and is licensed under the <a target="_blank" href="https://creativecommons.org/licenses/by-nc/4.0/">Creative Commons Attribution-NonCommercial 4.0 International License</a>',
    'Thanks for visiting! :)',
    '/Eddy',
  ]

  const getFontSize = () => {
    return parseInt(getComputedStyle(document.body).getPropertyValue('font-size'));
  }

  const pxToRem = (px) => {
    return px / getFontSize() + 'rem';
  }

  const createBubbleElements = (message, position, type='text') => {
    if(type === 'image'){
      const bubbleEl = document.createElement('div');
      const messageEl = document.createElement('img');
      const loadingEl = document.createElement('span');
      bubbleEl.classList.add('bubble');
      bubbleEl.classList.add('is-loading');
      bubbleEl.classList.add('cornered');
      bubbleEl.classList.add(position === 'right' ? 'right' : 'left');

      messageEl.classList.add('image');
      messageEl.src = message.split(':')[1];
      bubbleEl.appendChild(messageEl);
      bubbleEl.style.opacity = 0;

      loadingEl.classList.add('loading');
      loadingEl.innerHTML = loadingText;
      bubbleEl.appendChild(loadingEl);

      
      return {
        bubble: bubbleEl,
        message: messageEl,
        loading: loadingEl
      }
    }

    const bubbleEl = document.createElement('div');
    const messageEl = document.createElement('span');
    const loadingEl = document.createElement('span');
    bubbleEl.classList.add('bubble');
    bubbleEl.classList.add('is-loading');
    bubbleEl.classList.add('cornered');
    bubbleEl.classList.add(position === 'right' ? 'right' : 'left');
    messageEl.classList.add('message');
    loadingEl.classList.add('loading');
    messageEl.innerHTML = message;
    loadingEl.innerHTML = loadingText;
    bubbleEl.appendChild(loadingEl);
    bubbleEl.appendChild(messageEl);
    bubbleEl.style.opacity = 0;

    return {
      bubble: bubbleEl,
      message: messageEl,
      loading: loadingEl
    }
  }

  const getDimentions = (elements) => {
    return dimensions = {
      loading: {
        w: '4rem',
        h: '2.25rem'
      },
      bubble: {
        w: pxToRem(elements.bubble.offsetWidth + 4),
        h: pxToRem(elements.bubble.offsetHeight)
      },
      message: {
        w: pxToRem(elements.message.offsetWidth + 4),
        h: pxToRem(elements.message.offsetHeight)
      }
    }
  }

  const sendMessage = (message, position, type='text') => {
    const loadingDuration = (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + 500;
    let elements = ''
    if(type === 'image'){
      elements = createBubbleElements(message, position, 'image');
      const src = message.split(':')[1];
      elements.message.innerHTML = `<img src="${src}" style="width: 100%; height: auto;"/>`;
    } else {
      elements = createBubbleElements(message, position);
    }
    messagesEl.appendChild(elements.bubble);
    messagesEl.appendChild(document.createElement('br'));
    const dimensions = getDimentions(elements);
    elements.bubble.style.width = '0rem';
    elements.bubble.style.height = dimensions.loading.h;
    elements.message.style.width = dimensions.message.w;
    elements.message.style.height = dimensions.message.h;
    elements.bubble.style.opacity = 1;
    const bubbleOffset = elements.bubble.offsetTop + elements.bubble.offsetHeight;
    if (bubbleOffset > messagesEl.offsetHeight) {
      const scrollMessages = anime({
        targets: messagesEl,
        scrollTop: bubbleOffset,
        duration: 750
      });
    }
    const bubbleSize = anime({
      targets: elements.bubble,
      width: ['0rem', dimensions.loading.w],
      marginTop: ['2.5rem', 0],
      marginLeft: ['-2.5rem', 0],
      duration: 800,
      easing: 'easeOutElastic'
    });
    const loadingLoop = anime({
      targets: elements.bubble,
      scale: [1.05, .95],
      duration: 1100,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutQuad'
    });
    const dotsStart = anime({
      targets: elements.loading,
      translateX: ['-2rem', '0rem'],
      scale: [.5, 1],
      duration: 400,
      delay: 25,
      easing: 'easeOutElastic',
    });
    const dotsPulse = anime({
      targets: elements.bubble.querySelectorAll('b'),
      scale: [1, 1.25],
      opacity: [.5, 1],
      duration: 300,
      loop: true,
      direction: 'alternate',
      delay: (i) => (i * 100) + 50
    });
    setTimeout(() => {
      loadingLoop.pause();
      dotsPulse.restart({
        opacity: 0,
        scale: 0,
        loop: false,
        direction: 'forwards',
        update: (a) => {
          if (a.progress >= 65 && elements.bubble.classList.contains('is-loading')) {
            elements.bubble.classList.remove('is-loading');
            anime({
              targets: elements.message,
              opacity: [0, 1],
              duration: 300,
            });
          }
        }
      });
      bubbleSize.restart({
        scale: 1,
        width: [dimensions.loading.w, dimensions.bubble.w ],
        height: [dimensions.loading.h, dimensions.bubble.h ],
        marginTop: 0,
        marginLeft: 0,
        begin: () => {
          if (messageIndex < messages.length) elements.bubble.classList.remove('cornered');
        }
      })
    }, loadingDuration - 50);
  }

  const sendMessages = () => {
    const message = messages[messageIndex];
    const type = message === 'photo:img/eddy2.jpeg' ? 'image' : 'text';
    
    if (!message) return;

    sendMessage(message, 'left', type );
    ++messageIndex;
    setTimeout(sendMessages, (message.replace(/<(?:.|\n)*?>/gm, '').length * typingSpeed) + anime.random(900, 1200));
  }

  sendMessages();

}
