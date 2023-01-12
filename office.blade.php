<div class="section">
    <a name="{{$block["office"]->slug}}"></a>
    <div class="section_holder">
        <span class="section_title">{{$block["office"]->blockname}}</span>
        <div class="office">
            <div class="carousel">
                @foreach($office as $row)
                <div class="carousel_row-wrapper">
                    <div class="carousel_row" id="lightgallery{{ $loop->index +1 }}">
                        @foreach($row as $slide)
                        <a href="/storage/{{$slide->image}}" data-src="/storage/{{$slide->image}}" class="carousel_item">
                            <img src="/storage/{{$slide->image}}" alt="" class="carousel_image">
                        </a>
                        @endforeach
                        @foreach($row as $slide)
                        <a href="/storage/{{$slide->image}}" data-src="/storage/{{$slide->image}}" class="carousel_item">
                            <img src="/storage/{{$slide->image}}" alt="" class="carousel_image">
                        </a>
                        @endforeach
                    </div>
                    <div class="carousel_row carousel_row__duplicate" id="lightgallery{{ $loop->index +2 }}">
                        @foreach($row as $slide)
                        <a href="/storage/{{$slide->image}}" data-src="/storage/{{$slide->image}}" class="carousel_item">
                            <img src="/storage/{{$slide->image}}" alt="" class="carousel_image">
                        </a>
                        @endforeach
                        @foreach($row as $slide)
                        <a href="/storage/{{$slide->image}}" data-src="/storage/{{$slide->image}}" class="carousel_item">
                            <img src="/storage/{{$slide->image}}" alt="" class="carousel_image">
                        </a>
                        @endforeach
                    </div>
                </div>
                @endforeach

            </div>
        </div>

        @include('site.inc.form')
    </div>
</div>
