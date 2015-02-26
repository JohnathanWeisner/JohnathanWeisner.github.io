var trackExpander = trackExpander || {};

trackExpander.TRACKER_EXPANSIONS = {
    e : 'event',
    o : 'evtobjectname',
    p : 'evtplacement',
    u : 'evturl',
    a : 'evtaction',
    x : 'evtexternal',
    n : 'evtprogress',
    c : 'crispkey',
    t : 'trackerkey',
    k : 'partnerkey',
    r : 'random',
    xurl : 'xurl',
    showVerbose : 'showVerbose',
    d : 'adid',
    i : 'parentid',
    '0' : 'false',
    '1' : 'true',
    ap : 'app',
    an : 'animation',
    au : 'audio',
    br : 'banner',
    ca : 'call',
    cd : 'calendar',
    ck : 'click',
    cl : 'close',
    cv : 'conversion',
    cx : 'custom',
    dc : 'doubleclick',
    di : 'display',
    dl : 'download',
    dr : 'drag',
    en : 'engagement',
    ex : 'expand',
    fb : 'facebook',
    ga : 'gallery',
    gm : 'game',
    gy : 'gyro',
    ho : 'hover',
    hi : 'hide',
    ia : 'interaction',
    im : 'impression',
    ma : 'map',
    me : 'media',
    mn : 'menu',
    ms : 'microsite',
    ng : 'engagement',
    ob : 'object',
    or : 'orientation',
    pl : 'panel',
    po : 'panelobject',
    pr : 'progress',
    re : 'retract',
    ro : 'rotate',
    sc : 'scroll',
    sh : 'shake',
    sw : 'show',
    tb : 'tab',
    tl : 'tilt',
    ti : 'timer',
    tw : 'twitter',
    vo : 'video',
    ad : 'adunit',
    f : 'firstaction/confirmaction',
    io : 'ievtobjectname',
    ip : 'ievtplacement',
    'in' : 'ievtprogress',
    ii : 'iparentid',
    g : 'firstengagement/otherengagement'
}

trackExpander.getKeyValuePairs = function (trackerURL) {
    var trackerKeys = trackerURL.match(/(\w*=[^&]*)/g);

    trackerKeys = trackerKeys.map(function (keyPair) {
        var pairs = keyPair.match(/([^=]*)=([^=]*)/)
        return [pairs[1], pairs[2]]
    })
    return trackerKeys;
}

trackExpander.expandKeyValuePair = function (keyPair) {
    var key = keyPair[0],
        pair = keyPair[1],
        keyExpanded = this.TRACKER_EXPANSIONS[key],
        pairExpanded = this.TRACKER_EXPANSIONS[pair],
        expanded = [];

    keyExpanded ? expanded.push(keyExpanded) : expanded.push(key);
    pairExpanded ? expanded.push(pairExpanded) : expanded.push(pair);

    return expanded;
}

trackExpander.expandTracker = function (trackerURL) {
    var keyPairs = trackExpander.getKeyValuePairs(trackerURL);

    return keyPairs.map(function (keyPair) {
        return trackExpander.expandKeyValuePair(keyPair).join(' : ');
    }).join('\n');
}

document.addEventListener('DOMContentLoaded', function () {
    var trackerForm = document.getElementById('tracker-keys-form'),
        trackerOutput = document.getElementById('tracker-keys-expanded');
    
    trackerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var target = e.target,
            inputEl = target.children[0],
            inputText = inputEl.value;

        trackerOutput.innerHTML = trackExpander.expandTracker(inputText);
    });
}, false);