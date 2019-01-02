<?php session_start(); ?>
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Exelninja</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css?family=Nunito:300,300i,400,400i,600,600i,700,700i" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Merienda+One:300,300i,400,400i,600,600i,700,700i" rel="stylesheet">
    <link href="css/style.min.css" rel="stylesheet">
</head>

<body>
    <header> 
        <div class="slide-nav-btn-container">
            <div id="slide-nav-btn">
                <span class="line"></span>
                <span class="line"></span>
                <span class="line"></span>
            </div>
        </div>
        <div class="slide-nav  center-align" id="slide-nav">
            <ul class="slide-nav-ul" id="slide-nav-ul">
                <li><a class="scroll" href="/#section1">Hem</a></li>
                <li><a class="scroll" href="/#section3">Om oss</a></li>
                <li><a class="scroll" href="/#section4">Erbjudanden</a></li>
                <li><a class="scroll" href="/#section5">Cases</a></li>
                <li><a class="scroll" href="/#section6">Kontakt</a></li>
            </ul>
        </div>
    </header>
    <main id="main">
        <section class="adminSection" id="section1">
        <?php
            //Run if you are logged in
            // isset($_SESSION["user"])
            if(true){ ?>
                <div class="adminProfile">
                    <h3>Excelninja<?php // $_SESSION["user"]["username"] ?></h3>
                </div>
        <?php 
            }
            //Run if you are logged out
        else{ ?>
            <div class="loginMenu">
                <img src="Assets/ninjaAvatar.png" alt="Ninja avatar">
                <h2>Logga in</h2>
            
        <?php
            if(isset($_GET["error"])){ ?>
                <p class="alert"><?= $_GET["error"] ?></p>
        <?php } ?>
                <form action="login.php" method="POST" class="menu_send">
                    <div class="input-field">
                        <input type="text" name="username" id="username" required/>
                        <label for="username">Användarnamn:</label>
                    </div>
                    <div class="input-field">
                        <input type="password" name="password" id="password" required/>
                        <label for="password">Lösenord:</label>
                    </div>
                    <button>Logga in</button>
                </form>
            </div>
    <?php } ?>
        </section>
    </main>
	<script src="js/script.min.js"></script>
</body>
</html>