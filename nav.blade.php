<div class="menu">
    <div class="menu_header">
        <a href="/" class="menu_logo">IDa TECH</a>
        <button class="menu_close">close</button>
    </div>
    <nav class="menu_links">
        @foreach($menu as $mItem)
            <a href="#{{$mItem->slug}}" class="menu_link">
                <span class="menu_link-text">{{$mItem->name}}</span>
            </a>
        @endforeach
    </nav>
    <div class="menu_footer">
        <div class="menu_footer-text">
            <a href="{{$contacts['mail']->link}}" class="menu_footer-link">
                {{$contacts['mail']->name}}
            </a>
            <a href="{{$contacts['tel']->link}}" class="menu_footer-link">
                {{$contacts['tel']->name}}
            </a>
            <span class="menu_footer-link">
                {{$contacts['addr']->name}}
            </span>
        </div>
        <div class="menu_footer-social">
            @foreach($soclink as $soc)
                <a href="{{$soc->link}}" class="menu_footer-social-link">
                    <img class="menu_footer-social-image" src="/storage/{{$soc->image}}" alt="">
                </a>
            @endforeach
        </div>
    </div>
    <div class="menu_bg"></div>
</div>
