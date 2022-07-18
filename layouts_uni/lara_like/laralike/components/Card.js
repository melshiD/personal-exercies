
//WHEN YOU SIT BACK DOWN, DESTRUCT THIS MARKEUP FOR REACT COMSUMPTION

const Card = () => {
    return(
        <li class="panel relative transition-colors duration-300 dark text-white/85 bg-blue/7 hover:bg-blue/13 rounded-2xl episode-list-item flex cursor-pointer mb-[10px] !border-deep-black/4 py-4 px-8 is-frameworks"
    id="episode-1995" data-js="episode-number-7" style="height: 145px;">
    <div class="flex-center relative pr-0 font-bold mr-6">
        <div>
            <div class="">
                <div class="circle flex items-center"><a class="inherits-color cursor-pointer">
                        <div class="flex items-center justify-center rounded-full">
                            <div class="radial-progress-container rounded-full" style="height: 62px; width: 62px;">
                                <div class="radial-progress-inner" style="width: 58px;">
                                    <div class="flex-center h-full w-full rounded-full bg-blue/10"
                                        style="width: 62px; height: 62px; transform: scale(1);"><span
                                            class="text-2xl">07</span></div>
                                </div><svg class="radial-progress-bar" width="62" height="62" version="1.1">
                                    <defs>
                                        <radialGradient id="radial-gradient84071.4872142527" fx="1" fy="0.5" cx="0.5"
                                            cy="0.5" r="0.65">
                                            <stop offset="30%" stop-color="#EC454F"></stop>
                                            <stop offset="100%" stop-color="#EC454F"></stop>
                                        </radialGradient>
                                    </defs>
                                    <circle r="29" cx="31" cy="31" fill="transparent" stroke="rgba(0,0,0,.50)"
                                        stroke-dasharray="182.212373908208" stroke-dashoffset="0" stroke-linecap="round"
                                        style="height: 62px; width: 62px; stroke-width: 2px;"></circle>
                                    <circle transform="rotate(270, 31,31)" r="29" cx="31" cy="31" fill="transparent"
                                        stroke="url(#radial-gradient84071.4872142527)"
                                        stroke-dasharray="182.212373908208" stroke-dashoffset="182.212373908208"
                                        stroke-linecap="round"
                                        style="height: 62px; width: 62px; stroke-width: 2px; stroke-dashoffset: 182.212; transition: stroke-dashoffset 1000ms linear 0s;">
                                    </circle>
                                </svg>
                            </div>
                        </div>
                    </a></div>
            </div>
        </div>
    </div>
    <div class="episode-list-details flex flex-1 mobile:border-b-0">
        <div>
            <div class="items-center justify-between mb-3">
                <h4
                    class="episode-list-title flex items-center link inherits-color text-xl font-bold md:text-lg lg:text-xl lg:leading-none">
                    <a class="md:clamp one-line leading-normal inherits-color" title="Make a Route and Link to it"
                        href="/episodes/1995">Make a Route and Link to it</a></h4>
            </div>
        </div>
        <div class="episode-list-excerpt generic-content text-sm lg:block">
            <p class="clamp two-lines font-normal">
                The simplest form of our blog will surely consist of a list of blog post excerpts, which then
                individually link to a different page that contains the full post. Let's begin working toward that goal.
            </p>
        </div>
        <div class="mt-auto w-full hidden md:flex md:items-center"><span
                class="text-3xs text-grey-800 mr-4 font-medium uppercase"> Episode 7</span><span
                class="mr-3 inline-flex items-center"><svg width="10" viewBox="0 0 10 10" class="text-grey-800">
                    <g fill="none" fill-rule="evenodd">
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <path class="fill-current"
                                            d="M5 2C2.25 2 0 4.25 0 7s2.25 5 5 5 5-2.25 5-5-2.25-5-5-5zm2.282 6.923L4.615 7.318v-3.01h.77v2.608l2.307 1.355-.41.652z"
                                            transform="translate(-978.000000, -378.000000) translate(330.000000, 364.000000) translate(444.000000, 8.000000) translate(204.000000, 4.000000)">
                                        </path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg><span class="ml-1 text-3xs text-grey-800 text-xs font-medium lg:text-2xs">6:25
                    minutes</span></span>
            {/* <!----> */}
        </div>
    </div>
</li>
    );
}


export default Card;