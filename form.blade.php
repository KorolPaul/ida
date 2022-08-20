<div class="contact-form">
            <h3 class="contact-form_title">МЫ ВСЕГДА РАДЫ ЗНАКОМСТВУ С НОВЫМИ ЛЮДЬМИ!</h3>
            <div class="contact-form_content">
                <form action="" class="form">
                    @csrf
                    <input type="hidden" name="frompage" value="{{$frompage}}" id="frompage">
                    <div class="form_columns">
                        <div class="form_column">
                            <div class="form_row">
                                <input type="text" id="name" placeholder="">
                                <label class="form_label" for="name">Имя</label>
                            </div>
                            <div class="form_row error">
                                <input type="email" id="email" placeholder="">
                                <label class="form_label" for="email">Email</label>
                            </div>
                            <div class="form_row">
                                <input type="tel" id="tel" placeholder="">
                                <label class="form_label" for="tel">Телефон</label>
                            </div>
                        </div>
                        <div class="form_column">
                            <div class="form_row">
                                <textarea name="" id="mess" cols="30" rows="10" placeholder="">Сообщение</textarea>
                                <div class="attach">
                                    <input class="attach_input" onchange="setText(this);" type="file" name="" id="file" accept="application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document">
                                    <label class="attach_label" for="file" id="filelabel">Прикрепить резюме или другие файлы</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contact-form_sumbit">
                        <input type="submit" value="отправить" onclick="event.preventDefault(); checkForm();">
                    </div>
                </form>
            </div>
        </div>
