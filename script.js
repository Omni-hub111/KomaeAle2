document.getElementById('menu-icon').addEventListener('click', function() {
    var overlay = document.querySelector('.overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('overlay');
        
        // メニューアイコンの追加
        var menuIcon = document.createElement('img');
        menuIcon.src = 'Menu.png'; // Menu.pngのパスを指定
        overlay.appendChild(menuIcon);

        // テキストの追加
        var textContainer = document.createElement('div');
        textContainer.classList.add('text-container');

        var links = ['Access', 'Event', 'Top'];

        links.forEach(function(linkText) {
            var link = document.createElement('a');
            link.textContent = linkText;
            link.href = linkText.toLowerCase() + '.html'; // リンク先のページを設定
            textContainer.appendChild(link);
        });

        overlay.appendChild(textContainer);

        document.body.appendChild(overlay);
        
        // フェードイン
        setTimeout(function() {
            overlay.style.opacity = '1';
            document.documentElement.classList.add('overlay-open'); // Add class to html to disable scrolling
            document.body.classList.add('overlay-open'); // Add class to body to disable scrolling
        }, 10); // 少しの待機時間を設定してフェードインのアニメーションが発生するようにする
    }

    if (document.body.classList.contains('overlay-open')) {
        // フェードアウト
        overlay.style.opacity = '0';
        // 覆いを削除
        setTimeout(function() {
            overlay.parentNode.removeChild(overlay);
            document.documentElement.classList.remove('overlay-open'); // Remove class from html to re-enable scrolling
            document.body.classList.remove('overlay-open'); // Remove class from body to re-enable scrolling
        }, 300); // フェードアウトの時間（ミリ秒）
    }


    if (document.body.classList.contains('overlay-open')) {
        // フェードアウト
        overlay.style.opacity = '0';
        // 覆いを削除
        setTimeout(function() {
            overlay.parentNode.removeChild(overlay);
            document.documentElement.classList.remove('overlay-open'); // Remove class from html to re-enable scrolling
            document.body.classList.remove('overlay-open'); // Remove class from body to re-enable scrolling
        }, 300); // フェードアウトの時間（ミリ秒）
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const cheerSign = document.getElementById("cheers-sign");
    const highlight = document.getElementById("highlight");
    const photoContainer = document.querySelector(".photo-container");

    function adjustPosition(element, referenceElement, offsetY) {
        const referenceElementRect = referenceElement.getBoundingClientRect();
        element.style.top = (referenceElementRect.bottom + window.scrollY + offsetY) + "px";
    }

    function adjustPositions() {
        adjustPosition(highlight, cheerSign, 0);
        // 画面のサイズに応じてオフセットを変更
        const offset = window.innerWidth >= 720 ? -20 : -50;
        adjustPosition(photoContainer, cheerSign, offset);
    }

    window.addEventListener("resize", adjustPositions);
    window.addEventListener("scroll", adjustPositions);

    adjustPositions(); // 初期ロード時に位置を調整


    
});

document.addEventListener("DOMContentLoaded", function() {
    const photoRow = document.querySelector(".photo-row");

    // Picフォルダー内の写真ファイルのURLを取得
    const picFolderURL = "Pic/";
    fetch(picFolderURL)
        .then(response => response.text())
        .then(html => {
            // 取得したHTMLから写真ファイルのリストを取得
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const links = Array.from(doc.querySelectorAll("a"));
            const photoFiles = links
                .filter(link => link.href.match(/\.(jpeg|jpg|gif|png)$/i))
                .map(link => link.href);

            // Photo.pngを読み込む
            const maskImage = new Image();
            maskImage.src = "Photo.png";

            // 写真ファイルを読み込んでPhoto要素に追加
            photoFiles.forEach(photoFile => {
                const img = document.createElement("img");
                img.src = photoFile;
                img.alt = "Photo";
                img.classList.add("photo");
                // Photo.pngをマスクとして適用
                img.style.maskImage = `url(${maskImage.src})`;
                img.style.maskSize = "cover";
                photoRow.appendChild(img);
            });

            // 最後の写真の次に最初の写真を追加
            const lastPhotoClone = photoRow.lastElementChild.cloneNode(true);
            photoRow.insertBefore(lastPhotoClone, photoRow.firstElementChild);
        })
        .catch(error => console.error("Error fetching photos:", error));
});

document.addEventListener('scroll', function() {
    var pickUp = document.getElementById('Pick-up');
    var boundingPickUp = pickUp.getBoundingClientRect();

    if (
        boundingPickUp.top >= 0 &&
        boundingPickUp.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    ) {
        pickUp.classList.add('show-pick-up');
    } else {
        pickUp.classList.remove('show-pick-up');
    }


});

document.addEventListener("DOMContentLoaded", function() {
    const targetElements = document.querySelectorAll(".VISIT-KOMAE, .RESTAURANTS");

    function checkVisibility() {
        targetElements.forEach(function(targetElement) {
            const rect = targetElement.getBoundingClientRect();
            const viewHeight = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top <= viewHeight && rect.bottom >= 0) {
                targetElement.classList.add("visible");
            } else {
                targetElement.classList.remove("visible");
            }
        });
    }

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkVisibility);

    // Initial check
    checkVisibility();
});



document.addEventListener('DOMContentLoaded', function () {
    var leftCheer = document.getElementById('left-cheer');
    leftCheer.addEventListener('animationend', function () {
        leftCheer.style.animation = 'shakeAnimation 5s infinite';
        setTimeout(function () {
            createSplashEffect(leftCheer);
        }, 1000); // 1秒待ってからエフェクトを生成
    });
    
    var rightCheer = document.getElementById('right-cheer');
    rightCheer.addEventListener('animationend', function () {
        rightCheer.style.animation = 'shakeAnimation 5s infinite';
        setTimeout(function () {
            createSplashEffect(rightCheer);
        }, 1000); // 1秒待ってからエフェクトを生成
    });
});

function createSplashEffect(parentElement) {
    var splash = document.createElement('div');
    splash.classList.add('splash-effect');
    var rect = parentElement.getBoundingClientRect();
    splash.style.top = rect.top + (rect.height / 2) + 'px';
    splash.style.left = rect.left + (rect.width / 2) + 'px';
    document.body.appendChild(splash);
}

document.addEventListener("DOMContentLoaded", function() {
    const imageContainers = document.querySelectorAll(".syunka-pair .image-container");
    
    imageContainers.forEach(function(container) {
        const img = container.querySelector(".SyunkaImg");
        const hoverImgSrc = img.getAttribute("data-hover-src");
        const hoverImg = new Image();
        hoverImg.src = hoverImgSrc;
        hoverImg.classList.add("hover-img");
        container.appendChild(hoverImg);
    });
});

window.addEventListener('DOMContentLoaded', function() {
    const accessTitle = document.querySelector('.Access-Title');
    const frameImage = document.querySelector('.rectangle-container');

    function updateFrameImagePosition() {
        const accessTitleWidth = accessTitle.offsetWidth;
        const screenWidth = window.innerWidth;
        const additionalMargin = (screenWidth <= 800) ? 20 : 10; // Increase margin if screen width is less than or equal to 800px
        frameImage.style.top = `${accessTitleWidth + additionalMargin}px`;
    }

    // Initial position update
    updateFrameImagePosition();

    // Update position on window resize
    window.addEventListener('resize', updateFrameImagePosition);
});

window.onload = function() {
    var rectangle = document.getElementById("rectangle");

    if (window.innerHeight > 400 && window.innerWidth > 400) {
        window.addEventListener("scroll", function() {
            // ページのスクロール位置を取得
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // 開始位置と終了位置を設定
            var startPosition = 400; // 開始位置（スクロールトップがこの位置に達するとRectangleが現れます）
            var endPosition = 4000; // 終了位置（スクロールトップがこの位置に達するとRectangleが消えます）

            // スクロール位置が開始位置と終了位置の間にある場合、Rectangleの高さを設定
            if (scrollTop >= startPosition && scrollTop <= endPosition) {
                // スクロール位置に応じてRectangleの高さを計算
                var scrollPercentage = (scrollTop - startPosition) / (endPosition - startPosition);
                var rectangleHeight = scrollPercentage * 120 + "%"; // 120%の高さを設定
                rectangle.style.height = rectangleHeight;
            } else {
                // スクロール位置が範囲外の場合、Rectangleを非表示にする
                rectangle.style.height = "0";
            }
        });
    }
};

document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.Events');
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY + windowHeight;

    elements.forEach(function(element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition > elementPosition + element.clientHeight / 2) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    });
});

document.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.Images');
    const windowHeight = window.innerHeight;
    const scrollPosition = window.scrollY + windowHeight;

    elements.forEach(function(element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition > elementPosition + element.clientHeight / 2) {
            element.classList.add('show2');
        } else {
            element.classList.remove('show2');
        }
    });
});

window.addEventListener('DOMContentLoaded', function() {
    const accessTitle = document.querySelector('.Event-Title');
    const frameImage = document.querySelector('.youtube-container');

    function updateFrameImagePosition() {
        const accessTitleWidth = accessTitle.offsetWidth;
        const screenWidth = window.innerWidth;
        const additionalMargin = (screenWidth <= 800) ? 20 : 10; // Increase margin if screen width is less than or equal to 800px
        frameImage.style.top = `${accessTitleWidth + additionalMargin}px`;
    }

    // Initial position update
    updateFrameImagePosition();

    // Update position on window resize
    window.addEventListener('resize', updateFrameImagePosition);
});