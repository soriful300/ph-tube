const removeActiveClass = () => {
  const activeClass = document.getElementsByClassName('active');
  for (const btn of activeClass) {
    btn.classList.remove('active');
  }
};

function loadData() {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(response => response.json())
    .then(data => {
      displayData(data.categories);
    });
}
function displayData(categories) {
  const container = document.getElementById('container');
  for (const cat of categories) {
    const div = document.createElement('div');
    div.innerHTML = `
     <button id="btn-${cat.category_id}" onclick=(loadCatVideo(${cat.category_id})) class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
    `;
    container.appendChild(div);
  }
}

const loadVideo = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(response => response.json())
    .then(categories => {
      removeActiveClass();
      const allBtn = document.getElementById('all-btn');
      allBtn.classList.add('active');
      displayVideo(categories.videos);
    });
};
const displayVideo = videos => {
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = '';
  if (videos.length === 0) {
    videoContainer.innerHTML = `
     <div class="col-span-full  flex flex-col justify-center items-center   mt-40">
        <img src="./resurces/Icon.png" alt="">
        <h1 class="font-bold text-3xl text-center">Oops!! Sorry,There are no <br> content here</h1>
      </div>
    `;
  }
  videos.forEach(video => {
    const div = document.createElement('div');
    div.innerHTML = `
     <div class="card  ">
        <figure class="relative ">
          <img src="${
            video.thumbnail
          }" alt="Shoes" class="rounded-lg object-cover w-110 h-60" />
          <h3 class="bottom-2 right-5 absolute p-1 rounded font-semibold bg-black text-white">3hrs 56 min ago</h3>
        </figure>

        <div class="flex gap-3 px-0 py-5">
          <div class="profile gap-0">
            <div class="avatar">
              <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                <img src="${video.authors[0].profile_picture}" />
              </div>
            </div>
          </div>
          <div class="space-y-2">
            <h1 class="font-bold ">${video.title}</h1>
        <h3 class=" flex text-[#17171790]">${video.authors[0].profile_name} ${
      video.authors[0].verified == true
        ? `<img class="w-5 h-5 mt-1 mx-1"
                src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt="">`
        : ``
    } <h3>
            <h3 class="text-[#17171790]">91k views</h3>
           
          </div>
        </div>
         <button onclick=" videoDetails('${
           video.video_id
         }')" class="btn ">Video Details</button>
      </div>
    `;
    videoContainer.appendChild(div);
  });
};

const videoDetails = videoId => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`)
    .then(response => response.json())
    .then(video => {
      showVideoDetails(video.video);
    });
};
const showVideoDetails = videoDetails => {
  console.log(videoDetails.title);
  document.getElementById('video_ditails').showModal();
  const showDetails = document.getElementById('show-details');
  showDetails.innerHTML = `
  <img class="rounded-xl" src="${videoDetails.thumbnail}" alt="">
  <h1>${videoDetails.title}</h1>`;
};
const loadCatVideo = id => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const clickBtn = document.getElementById(`btn-${id}`);
      removeActiveClass();
      clickBtn.classList.add('active');
      displayVideo(data.category);
    });
};
loadData();
