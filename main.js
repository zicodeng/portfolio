$(document).ready(() => {
    console.log("Thanks for visiting Zico's personal portfolio website!");

    AOS.init();

    // Capture DOM nodes only once when DOM is ready.
    const $face = $('.face');
    const $dialogue = $('.dialogue-bubble');
    const $sectionAbout = $('.about');
    const $sectionEducation = $('.education');
    const $sectionEmployment = $('.employment');
    const $sectionProjects = $('.projects');
    const $sectionContact = $('.contact');

    handleResizeWindow();
    handleScrollWindow(
        $face,
        $dialogue,
        $sectionAbout,
        $sectionEducation,
        $sectionEmployment,
        $sectionProjects,
        $sectionContact
    );
    faceInteractions($face);
});

/*=============================================
=         Handle Window Resize Event          =
=============================================*/

const handleResizeWindow = () => {
    // Used to debounce window resize event.
    let resizeTimer;
    let windowWidth = window.innerWidth;
    alertSmallWindow(windowWidth);
    $(window).resize(() => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            alertSmallWindow(this.innerWidth);
        }, 250);
    });
};

const alertSmallWindow = windowWidth => {
    if (windowWidth < 1400) {
        window.alert(
            `Your current browser window size (${windowWidth}px) is too small. To get the best experience viewing this webpage, please increase your browser window size over 1400px.`
        );
    }
};

/*=====  End of Handle Window Resize Event  ======*/

/*=============================================
=          Handle Window Scroll Event         =
=============================================*/

const handleScrollWindow = (
    $face,
    $dialogue,
    $sectionAbout,
    $sectionEducation,
    $sectionEmployment,
    $sectionProjects,
    $sectionContact
) => {
    // Used to determine scroll direction
    let prevScrollTop = 0;

    $(window).scroll(e => {
        const currScrollTop = $(this).scrollTop();

        changeFaceRadius(currScrollTop, $face);
        showSectionDialogue(
            currScrollTop,
            $dialogue,
            $sectionAbout,
            $sectionEducation,
            $sectionEmployment,
            $sectionProjects,
            $sectionContact
        );

        prevScrollTop = currScrollTop;
    });
};

/*----------  Utility Functions  ----------*/
const isScrollingDown = (prevScrollTop, currScrollTop) =>
    currScrollTop > prevScrollTop;

/*----------  Change Face Radius  ----------*/
const changeFaceRadius = (currScrollTop, $face) => {
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

/*---------- Show Section Dialogue  ----------*/
const showSectionDialogue = (
    currScrollTop,
    $dialogue,
    $sectionAbout,
    $sectionEducation,
    $sectionEmployment,
    $sectionProjects,
    $sectionContact
) => {
    const offset = 300;
    switch (true) {
        // Header
        case currScrollTop < $sectionAbout.offset().top - 150:
            removeDialogue($dialogue);
            break;

        // Section About
        case currScrollTop >= $sectionAbout.offset().top - offset &&
            currScrollTop < $sectionEducation.offset().top - offset:
            createDialogue($dialogue, 'Do you wanna know me?', '#ED5565');
            break;

        // Section Education
        case currScrollTop >= $sectionEducation.offset().top - offset &&
            currScrollTop < $sectionEmployment.offset().top - offset:
            createDialogue($dialogue, 'How do I become smarter?', '#48CFAD');
            break;

        // Section Employment
        case currScrollTop >= $sectionEmployment.offset().top - offset &&
            currScrollTop < $sectionProjects.offset().top - offset:
            createDialogue($dialogue, 'Play hard, work harder!', '#FFCE54');
            break;

        // Section Projects
        case currScrollTop >= $sectionProjects.offset().top - offset &&
            currScrollTop < $sectionContact.offset().top - offset:
            createDialogue(
                $dialogue,
                'Check out my awesome projects!',
                '#AC92EC'
            );
            break;

        // Section Contact
        case currScrollTop >= $sectionContact.offset().top - offset:
            removeDialogue($dialogue);
            break;
    }
};

const createDialogue = ($dialogue, text, color) => {
    if ($dialogue.text() !== text) {
        $dialogue.text(text).css('color', color);
    }
    if (!parseInt($dialogue.css('opacity'))) {
        $dialogue.css({
            transform: 'translate(0, 0) scale(1)',
            opacity: '1'
        });
    }
};

const removeDialogue = $dialogue => {
    $dialogue.css({
        transform: 'translate(100px, 0) scale(.4)',
        opacity: '0'
    });
};

/*=====  End of Handle Window Scroll Event  ======*/

/*=============================================
=              Face Interactions              =
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
=              Floating Hearts                =
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
