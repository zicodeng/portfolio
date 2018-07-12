$(document).ready(() => {
    console.log("Thanks for visiting Zico's personal portfolio website!");

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

/*=====  End of Eyes Follow Mouse Movement  ======*/
