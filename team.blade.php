<div class="section">
    <a name="{{$block["team"]->slug}}"></a>
    <div class="section_holder">
        <span class="section_title">{{$block["team"]->blockname}}</span>
        <div class="team">
            <img class="team_circle" src="src/img/team-circle.svg" alt="">
            <div class="team_slider">
                <div class="team_slider-scroll">
                    @foreach($team as $person)
                    <div>
                        <div class="team_slider-image-wrapper @if($loop->first) active @endif" data-slide="{{ $loop->index +1 }}">
                            <div class="team_slider-image-angle">
                                <img src="/storage/{{$person->image}}" alt="" class="team_slider-image">
                            </div>
                            <div class="team_slider-meta">
                                <span class="person_name">{{$person->name}}</span>
                                <span class="person_position">{{$person->position}}</span>
                            </div>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>
            <div class="team_content">
                @foreach($team as $person)
                <div class="person @if($loop->first) active @endif" data-slide="{{ $loop->index + 1}}">
                    <div class="person_header">
                        <div class="person_image-wrapper">
                            <img src="/storage/{{$person->image}}" alt="" class="person_image">
                        </div>
                        <span class="person_name">{{$person->name}}</span>
                        <span class="person_position">{{$person->position}}</span>
                    </div>
                    <div class="person_content">
                        <h3 class="person_title">{{$person->header}} </h3>
                        <div class="person_description">
                            {!!  $person->text!!}
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</div>
