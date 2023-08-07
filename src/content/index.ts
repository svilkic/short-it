if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', afterDOMLoaded);
} else {
  afterDOMLoaded();
}

function afterDOMLoaded(): void {
  let prevUrl: string = window.location.href;

  function ControlVideos(): void {
    const videoContainers: NodeListOf<Element> = document.querySelectorAll(
      'ytd-reel-video-renderer'
    );
    videoContainers.forEach((videoContainer) => {
      AddControlsAndObserve(videoContainer as HTMLElement);
    });
  }

   prevUrl = window.location.href;
  const urlChangeObserver = new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== prevUrl) {
      prevUrl = currentUrl;
      ControlVideos();
    }
  });

  function AddControlsAndObserve(videoContainer: HTMLElement): void {
    AddControls(videoContainer);
  
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        const addedNodes = Array.from(mutation.addedNodes);
        const removedNodes = Array.from(mutation.removedNodes);
  
        if (
          addedNodes.includes(videoContainer) ||
          addedNodes.some((node) => videoContainer.contains(node)) ||
          removedNodes.includes(videoContainer) ||
          removedNodes.some((node) => videoContainer.contains(node))
        ) {
          AddControls(videoContainer);
          break;
        }
      }
    });
  
    const parentElement = videoContainer.parentElement;
    if (parentElement) {
      observer.observe(parentElement, { childList: true, subtree: true });
    }
  }

  const config = { childList: true, subtree: true };
  urlChangeObserver.observe(document.body, config);

  ControlVideos();
}

function hasCustomControls(videoContainer: HTMLElement): boolean {
  return videoContainer.querySelector('.custom-video-controls') !== null;
}

const controlsContainer = document.createElement('div');
controlsContainer.className = 'custom-video-controls';

function AddControls(videoContainer: HTMLElement): void {
  if (hasCustomControls(videoContainer)) {
    return;
  }



  const video = videoContainer.querySelector('video');

  if (!video) {
    return;
  }

  createButtonContainer(videoContainer,video);
  createProgressBar(videoContainer,video);

  videoContainer.appendChild(controlsContainer);
}

function createButtonContainer(
  videoContainer: HTMLElement,
  video: HTMLVideoElement
): void {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons-container';

  createButton(buttonsContainer, 'Rewind', () => {
    video.currentTime -= 5;
  });

  createButton(buttonsContainer, 'Play/Pause', () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  });

  createButton(buttonsContainer, 'Forward', () => {
    video.currentTime += 5;
  });

  controlsContainer.appendChild(buttonsContainer);
}
function createButton(
  container: HTMLElement,
  text: string,
  clickHandler: () => void
): void {
  const button = document.createElement('button');
  button.innerText = text;
  button.onclick = clickHandler;
  container.appendChild(button);
}

function createProgressBar(
  videoContainer: HTMLElement,
  video: HTMLVideoElement
): void {
  const progressBar = document.createElement('div');
  progressBar.className = 'custom-progress-bar';

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = '0';
  slider.max = video.duration.toString();
  slider.value = '0';

  slider.addEventListener('input', () => {
    video.currentTime = parseFloat(slider.value);
  });

  progressBar.appendChild(slider);
  controlsContainer.appendChild(progressBar);

  // Update the slider value as the video progresses
  video.ontimeupdate = (event) => {
    console.log("The currentTime attribute has been updated. Again.");
    slider.value = video.currentTime.toString();
  };
}
