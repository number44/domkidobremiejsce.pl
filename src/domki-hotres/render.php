


    <section class='page w-h100' style="padding-top: 100px;">
    <div class="container">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="https://panel.hotres.pl/public/api/hotres_v3.js"></script>
<script>
    function startHotres()
    {
    var start = localStorage.getItem('start');
    var finish = localStorage.getItem('finish');
    if(start =='' && finish == ''){
        createHotres({'action':'index','auth':'2afeb2bf2991a3b0f68f476fb3e41476','lang':'pl' });
    }
    else{
        createHotres({"action":"index","auth":"2afeb2bf2991a3b0f68f476fb3e41476","lang":"pl","cnt_adult":2,"arrival_date":start,"departure_date":finish});

    }
    $(".bookBtn").hide();


    }

    window.addEventListener("load", startHotres, false);

</script>
    <div id="hotresContainer"></div>
        <script>
        </script><p style="padding:15px;text-align:center"> Rezerwację obsługuje system : <a href="https://hotres.pl" title="system rezerwacji pokoi online">HOTRES.pl</a></p>
    </div>
</section>






