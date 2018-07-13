$(document).ready(() => {
    console.log("Thanks for visiting Zico's personal portfolio website!");

    AOS.init();

    const $face = $('.face');

    handleScrollWindow($face);
    faceInteractions($face);
});

/*=============================================
=       Handle Window Scroll Event            =
=============================================*/

const handleScrollWindow = $face => {
    // Used to determine scroll direction
    let prevScrollTop = 0;

    $(window).scroll(e => {
        const currScrollTop = $(this).scrollTop();

        changeFaceRadius($face, currScrollTop);

        prevScrollTop = currScrollTop;
    });
};

/*----------  Utility Functions  ----------*/
const isScrollingDown = (prevScrollTop, currScrollTop) =>
    currScrollTop > prevScrollTop;

/*----------  Change Face Radius  ----------*/
const changeFaceRadius = ($face, currScrollTop) => {
    const faceHeight = $face.height();

    // Change face radius only if face (header section) is visible
    if (currScrollTop < faceHeight) {
        $face.css({
            'border-bottom-left-radius': getCurrFaceRadius(
                faceHeight,
                currScrollTop
            ),
            'border-bottom-right-radius': getCurrFaceRadius(
                faceHeight,
                currScrollTop
            )
        });
    }
};

const getCurrFaceRadius = (faceHeight, currScrollTop) => {
    const rate = 0.06;
    const offset = 50;
    return `${(faceHeight - currScrollTop - offset) * rate}%`;
};

/*=====  End of Handle Window Scroll Event  ======*/

/*=============================================
=            Face Interactions                =
=============================================*/

const faceInteractions = $face => {
    const $pupilLeft = $('#pupil-left');
    const $pupilRight = $('#pupil-right');
    const $mouth = $('#mouth');
    const faceCenterX = $face.width() / 2;
    const faceCenterY = $face.height() / 2;
    $face.mousemove(e => {
        // Eyes follow cursor
        const pupilDx = (e.clientX - faceCenterX) / 25;
        const pupilDy = (e.clientY - faceCenterY) / 15;
        $pupilLeft.css('transform', `translate(${pupilDx}px, ${pupilDy}px)`);
        $pupilRight.css('transform', `translate(${pupilDx}px, ${pupilDy}px)`);

        // Mouth follow cursor
        const mouthDy = 250 + (e.clientY - faceCenterY) * 0.3;
        $mouth.attr('d', `M100,250 Q250,${mouthDy} 400,250`);
    });
};

/*=====  End of Face Interactions  ======*/

/*=============================================
=            Floating Hearts                  =
=============================================*/

const love = setInterval(() => {
    const num = Math.floor(Math.random() * 40) + 1;
    const size = Math.floor(Math.random() * 65) + 10;
    const left = Math.floor(Math.random() * 100) + 1;
    const color = Math.floor(Math.random() * 25) + 100;
    const duration = Math.floor(Math.random() * 5) + 5;

    $('.floating-hearts').append(
        `<div
        class='heart'
        style='width: ${size}px; height: ${size}px; left: ${left}%; background: rgba(255, ${color -
            25}, ${color}, 1); animation: love ${duration}s ease'>
        </div>`
    );

    // Create different variations
    $('.floating-hearts').append(
        `<div
        class='heart'
        style='width: ${size - 10}px; height: ${size - 10}px; left: ${left +
            num}%; background: rgba(255, ${color - 25}, ${color +
            25}, 1); animation: love ${duration + 5}s ease'>
        </div>`
    );

    // Remove rendered hearts if they float out of the page or too large
    $('.heart').each(function() {
        const top = $(this)
            .css('top')
            .replace('px', '');
        const width = $(this)
            .css('width')
            .replace('px', '');
        if (parseInt(top) <= -100 || parseInt(width) >= 150) {
            $(this).remove();
        }
    });
}, 500);

/*=====  End of Floating Heart  ======*/
