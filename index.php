<?php

if(isset($_POST)){

	if(!empty($_POST['select']))
		$subject = trim($_POST['select']);
	else
		$subject = 'Aucun sujet séléctionné';

	if(!empty($_POST['name']))
		$name = trim($_POST['name']);
	else
		$name = '';

	if(!empty($_POST['email']))
		$email = trim($_POST['email']);

	if(!empty($_POST['phonenumber']))
		$phonenumber = trim($_POST['phonenumber']);
	else
		$phonenumber = '';

	if(!empty($_POST['message']))
		$message = trim($_POST['message']);
	else
		$message = '';

	if(!empty($_POST['email'])) {

		$to      = 'hello@hakolad.fr';
		$subject = $subject;
		$message = $message . "\r\n\r\n" . $phonenumber;
		$headers = 'From: ' . $email . "\r\n" .
		'Reply-To: ' . $email . "\r\n" .
		'X-Mailer: PHP/' . phpversion();

		mail($to, $subject, $message, $headers);

	}

}

?>
<!-- 

   /yy/`                       /++os                          /+oos`                        ./o+-   
  :dd-                          `ddd                           `hdd`                          :dd-  
  sdd`                           sdd                            ydd`                          .ddo  
  sdd                            sdd                            ydd`                           dds  
  ydh                            sdd                            ydd`                           dds  
 `dd-                            sdd                            ydd`                           /dh  
/o+. ./++ss+.     `::::/oo:      sdd   :/+++/`   `/o+//o+-      ydd`    `::::/oo:       ./o+//+-:y+`
`+y/+/`   ydh`   -dds`  `ddo     sdd    `yo.    +dh-    +dh-    ydd`   -dds   `ddo    `odh.    :ooo:
  hdo     +dd:   `os+    hdd     sdd  `++`     +dd/      ydd`   ydd`   `os+    hdd    sdd.     :dh  
  ydd     +dd:        .:/ddd`    sdd/odo`      hdd`      odd/   ydd`        .:/ddd   .ddh      hdy  
  sdd     +dd:    ./o+:` hdd`    sdd`:hdh-     ddd`      +dd+   ydd`    .+o+:` hdd   -ddy      dds  
  odd.    +dd:   odh`    hdd`    sdd  `sdd+    sdd-      sdd-   ydd`   odh`    hdd   `hdd`    `dds  
  -dd:    +dd:   ddh`  `:ddd`    ydd`   /ddh-  `ydy`    :dd/    ydd.   ddy`   /ddd    :ddo    -dd:  
   .+o/../yyys/. -shhs++-:hho/-:+yyyo:  .oyyy+.  :ss+:/oy+.   :+yyyo/` -shys++-:hho/.  .oyho/+yy:   

-->
<!DOCTYPE html>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title>{ Hakolad } Artisans du monde digital</title>

	<meta name="title" content="{ Hakolad } Artisans du monde digital">
	<meta name="description" content="Hakolad, créateur de site internet.">

	<meta property="og:title" content="{ Hakolad } Artisans du monde digital">
	<meta property="og:type" content="website">
	<meta property="og:url" content="http://www.hakolad.fr">
	<meta property="og:site_name" content="{ Hakolad } Artisans du monde digital">
	<meta property="og:description" content="{ Hakolad } Artisans du monde digital & créateur de site internet.">
	<meta name="author" content="Hakolad" />
	<meta name="copyright" content="Hakolad" />
	<meta name="viewport" content="width=device-width">

	<link rel="icon" type="image/jpg" href="img/favicon.jpg" sizes="187x187">

	<link rel="canonical" href="http://www.hakolad.fr" />
	<link href='http://fonts.googleapis.com/css?family=Dosis:300,400|Lato:300,400|Playfair+Display+SC' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/style.css">
</head>
<body>

	<header id="header">
		<h1 id="logo"><a href="#/accueil-front">Hakolad</a></h1><!--
		--><nav id="menu">
			<ul>
				<li><a href="#/accueil"><span>Accueil</span></a></li><!--
				--><li><a href="#/atelier-creation-web-bas-rhin"><span>L'atelier</span></a></li><!--
				--><li><a href="#/prestation"><span>Nos prestations</span></a></li><!--
				--><li><a href="#/realisation"><span>Nos réalisations</span></a></li><!--
				--><li><a href="#/contact-agence-web-strasbourg"><span>Nous contacter</span></a></li>
			</ul>
		</nav>
	</header>

	<div id="social-media">
		<ul>
			<li><a href="https://www.facebook.com/hakolad.atelier" target="_blank" title="facebook"><span>Hakolad</span></a></li>
			<li><a href="https://plus.google.com/+HakoladFr" target="_blank" title="google+"><span>Hakolad+</span>+</a></li>
			<li><a href="https://instagram.com/hakoladpix/" target="_blank" title="instagram"><span>Hakoladpix</span></a></li>
		</ul>
	</div>

	<div id="loader">		
	</div>

	<section id="ascensor">

		<section id="accueil-front" class="level">
			<h1>Hakolad</h1>
			<h2>Les artisans du monde digital</h2>
			<div id="accueil-line-left"></div>
			<div id="accueil-line-right"></div>
			<p id="start-navigation-gif"><a href="#/accueil"><img src="img/scroll-yellow.gif" alt=""></a></p>
			<p id="start-navigation"><a href="#/accueil"><span>Atelier</span> <span>Hakolad</span></a></p>
		</section>

		<section id="accueil" class="level">

			<article id="accueil-1">
				<div class="container">
					<div class="left-container">
						<header>
							<h1>Les <strong>artisans</strong> du web</h1>
						</header>
						<div class="content">
							<h3>Hakolad c'est l'association de deux artisans œuvrant chacun dans leur domaine respectif proposant des services de création de sites internet uniques à Strasbourg et ses alentours. Comme tout bon artisan, nous mettons notre savoir-faire au service d'autrui, réalisant des produits fonctionnels, utiles et ergonomiques.</h3>
						</div>								
					</div>
					<div class="right-container">						
						<p class="image"><img src="img/imac.png" alt="Garage Eric Muller - Hakolad"></p>
					</div>			
				</div>
			</article>

			<article id="accueil-2">
				<div class="container">
					<header>
						<h1><strong>Vous n'avez pas d'idées particulières</strong> pour votre site internet ?</h1>
					</header>
					<div class="Content">
						<h3>Vous n'avez pas d'idées particulières pour votre site internet ? Nous saurons vous conseiller et vous proposer une solution originale. Aujourd'hui, avec le développement du numérique et d'internet, chaque entreprise a besoin d'être présente sur le web, mais peu de sociétés ont un site représentant leur identité. Nous vous aiguillerons  dans votre recherche , nous réfléchirons avec vous, afin de réaliser une prestation sur mesure en fonction de votre budget.</h3>
					</div>					
				</div>
				<canvas id="accueil-canvas"></canvas>
			</article>

		</section>

		<section id="atelier-creation-web-bas-rhin" class="level">
			<article id="atelier-1" class="ateliers">
				<div class="container">
					<div class="left">
						<p><img src="img/atelier-1.jpg" alt=""></p>
					</div>
					<div class="right">
						<header>
							<h1>Notre <strong>Atelier</strong></h1>
							<h2><strong>Hakolad</strong>, c'est qui ?</h2>
						</header>
						<div class="content">
							<p>Thomas Hammer, développeur web, et Virgile Koch, infographiste, deux acteurs de la scène digitale, aux compétences complémentaires, qui s'associent afin de vous proposer des prestations optimales et de répondre au mieux à vos attentes. </p>
							<p><strong>Hakolad</strong>, c'est donc deux interlocuteurs, et seulement deux ! Que vous ayez des demandes graphiques et/ou techniques, nous saurons y répondre.</p>
							<p class="atelier-gif"><a href="#/atelier-creation-web-bas-rhin/c-est-quoi"><img src="img/scroll-yellow.gif" alt=""></a></p>
							<p class="atelier-arrow"><a href="#/atelier-creation-web-bas-rhin/c-est-quoi"><span>Atelier</span> <span>Hakolad</span></a></p>
						</div>					
					</div>					
				</div>
			</article>
			<article id="atelier-2" class="ateliers">
				<div class="container">
					<div class="left">
						<p><img src="img/atelier-2.jpg" alt=""></p>
					</div>
					<div class="right">
						<header>
							<h1>Notre <strong>Atelier</strong></h1>
							<h2><strong>Hakolad</strong>, c'est quoi ?</h2>
						</header>
						<div class="content">
							<p>Hakolad, c'est l'association de deux entrepreneurs, travaillant dans le monde du  web, désirant proposer des prestations de qualités à leurs clients. Spécialisés dans la création de sites internet, nous proposons différentes solutions afin de satisfaire votre demande et d'exprimer au mieux votre spécificité.</p>
							<p>A l'image d'un artisan dans son atelier de fabrication, notre objectif vise à créer un produit digital utile. <br>Notre but premier est de mettre à votre disposition nos compétences pour créer un produit fini, unique, qui vous permettra de vous différencier sur votre propre marché.</p>
							<p class="atelier-gif"><a href="#/atelier-creation-web-bas-rhin/c-est-qui"><img src="img/scroll-white.gif" alt=""></a></p>
							<p class="atelier-arrow"><a href="#/atelier-creation-web-bas-rhin/c-est-qui"><span>Atelier</span> <span>Hakolad</span></a></p>
						</div>					
					</div>					
				</div>				
			</article>
		</section>

		<section id="prestation" class="level">
			<section id="prestation-container">

				<nav id="prestation-nav">
					<ul>
						<li><a href="#sites-vitrines-strasbourg">Sites vitrines</a></li>
						<li><a href="#sites-e-commerces-alsace">Sites e-commerces</a></li>
						<li><a href="#blogs-creation-sites-strasbourg">Blogs</a></li>
						<li><a href="#community-management">Community Management</a></li>
						<li><a href="#logotypes-creation-identite">Logotype</a></li>
						<li><a href="#flyers-affiches-strasbourg">Flyers / Affiches</a></li>
					</ul>
				</nav>

				<div id="explain-background"></div>

				<article id="sites-vitrines-strasbourg" class="prestation-explain">
					<div class="container">
						<header>
							<h1>Nos <strong>Prestations</strong></h1>
						</header>
						<div class="content">
							<h2>Sites <strong>vitrines</strong></h2>
							<p>Comme son nom l'indique, un site vitrine sert à présenter votre entreprise et les produits/services que vous proposez à vos clients. Un site vitrine est l'image de votre entreprise, il doit refléter vos valeurs. C'est le premier lien que vous aurez avec vos clients potentiels.</p>
							<p class="prestation-gif white"><a href="#/prestation/sites-e-commerces-alsace"><img src="img/scroll-white.gif" alt=""></a></p>
							<p class="prestation-gif yellow"><a href="#/prestation/sites-e-commerces-alsace"><img src="img/scroll-yellow.gif" alt=""></a></p>
							<p class="prestation-arrow-bottom"><a href="#/prestation/sites-e-commerces-alsace"><span>Atelier</span> <span>Hakolad</span></a></p>
						</div>					
					</div>						
				</article>

				<article id="sites-e-commerces-alsace" class="prestation-explain yellow">
					<div class="container">
						<header>
							<h1>Nos <strong>Prestations</strong></h1>
						</header>
						<div class="content">
							<h2>Sites <strong>E-commerces</strong></h2>
							<p>Un site de vente en ligne offre l'opportunité d'élargir sa clientèle, car cela permet d'obtenir des recettes supplémentaires d'une part, mais aussi de booster votre clientèle en visant un public dont la localisation ne se réduit pas qu'aux alentours de votre boutique physique d'autre part.</p>
							<p class="prestation-arrow-top"><a href="#/prestation/sites-vitrines-strasbourg"><span>Atelier</span> <span>Hakolad</span></a></p>
							<p class="prestation-gif white"><a href="#/prestation/blogs-creation-sites-strasbourg"><img src="img/scroll-white.gif" alt=""></a></p>
							<p class="prestation-gif yellow"><a href="#/prestation/blogs-creation-sites-strasbourg"><img src="img/scroll-yellow.gif" alt=""></a></p>
							<p class="prestation-arrow-bottom"><a href="#/prestation/blogs-creation-sites-strasbourg"><span>Atelier</span> <span>Hakolad</span></a></p>
						</div>					
					</div>		
				</article>

				<article id="blogs-creation-sites-strasbourg" class="prestation-explain">
					<div class="container">
						<header>
							<h1>Nos <strong>Prestations</strong></h1>
						</header>
						<div class="content">
							<h2>Des <strong>blogs</strong></h2>
							<p>Un blog est un type bien particulier de site internet, reprenant de manière général le même fonctionnement qu'un journal de bord ou qu'un journal intime. <br>A l'origine, un blog était un simple outil de rédaction. De nos jours, c'est devenu une plate-forme incontournable du web permettant de partager des vidéos et des images, aidant ainsi à alimenter des comptes sociaux.</p>
							<p>Vous avez un projet ? Vous voulez par exemple lancer un site e-commerce ? Créer un blog en amont vous permettra de communiquer sur tous les aspects de votre entrepreneuriat, mais surtout, de démarrer la communication de votre marque.</p>
							<p class="prestation-arrow-top"><a href="#/prestation/sites-e-commerces-alsace"><span>Atelier</span> <span>Hakolad</span></a></p>
							<p class="prestation-gif white"><a href="#/prestation/community-management"><img src="img/scroll-white.gif" alt=""></a></p>
							<p class="prestation-gif yellow"><a href="#/prestation/community-management"><img src="img/scroll-yellow.gif" alt=""></a></p>
							<p class="prestation-arrow-bottom"><a href="#/prestation/community-management"><span>Atelier</span> <span>Hakolad</span></a></p>
						</div>						
					</div>		
				</article>

				<article id="community-management" class="prestation-explain yellow">
					<div class="container">
						<header>
							<h1>Nos <strong>Prestations</strong></h1>
						</header>
						<div class="content">
							<h2><strong>Community</strong> Management</h2>
							<p>La gestion des réseaux sociaux est une partie prépondérante du bon fonctionnement d'une entreprise. Avoir une présence sur les différentes plate-formes sociales permet le développement de la marque sur internet et une fidélisation de sa clientèle.</p>
							<p class="prestation-arrow-top"><a href="#/prestation/blogs-creation-sites-strasbourg"><span>Atelier</span> <span>Hakolad</span></a></p>
							<p class="prestation-gif white"><a href="#/prestation/logotypes-creation-identite"><img src="img/scroll-white.gif" alt=""></a></p>
							<p class="prestation-gif yellow"><a href="#/prestation/logotypes-creation-identite"><img src="img/scroll-yellow.gif" alt=""></a></p>
							<p class="prestation-arrow-bottom"><a href="#/prestation/logotypes-creation-identite"><span>Atelier</span> <span>Hakolad</span></a></p>
						</div>					
					</div>		
				</article>

				<article id="logotypes-creation-identite" class="prestation-explain">
					<div class="container">
						<header>
							<h1>Nos <strong>Prestations</strong></h1>
						</header>
						<div class="content">
							<h2>Création de <strong>logos</strong></h2>
							<p>Un logotype est la signature de votre entreprise. Toute société se doit d'avoir un logo de qualité, car il est l'identité de votre compagnie, il permet aux consommateurs de vous reconnaître en un coup d'œil et ainsi de vous démarquer des autres organisations d'un même secteur. Un logo constitue la base d'une création d'entreprise, car il vous suivra du début à la fin et se retrouvera sur tous vos documents de communication.</p>
							<p class="prestation-arrow-top"><a href="#/prestation/community-management"><span>Atelier</span> <span>Hakolad</span></a></p>
							<p class="prestation-gif white"><a href="#/prestation/community-management"><img src="img/scroll-white.gif" alt=""></a></p>
							<p class="prestation-gif yellow"><a href="#/prestation/community-management"><img src="img/scroll-yellow.gif" alt=""></a></p>
							<p class="prestation-arrow-bottom"><a href="#/prestation/flyers-affiches-strasbourg"><span>Atelier</span> <span>Hakolad</span></a></p>
						</div>						
					</div>		
				</article>

				<article id="flyers-affiches-strasbourg" class="prestation-explain yellow">
					<div class="container">
						<header>
							<h1>Nos <strong>Prestations</strong></h1>
						</header>
						<div class="content">
							<h2><strong>Print</strong></h2>
							<p>Une prestation print désigne toutes les créations de supports imprimés destinés à la communication de votre entreprise. Nous vous proposons la réalisation de flyers, de plaquettes, d'affiches et de cartes de visite, afin d'optimiser votre identité et de communiquer correctement sur vos prestations.</p>
							<p class="prestation-arrow-top"><a href="#/prestation/logotypes-creation-identite"><span>Atelier</span> <span>Hakolad</span></a></p>
							<p class="prestation-gif white"><a href="#/prestation/logotypes-creation-identite"><img src="img/scroll-white.gif" alt=""></a></p>
							<p class="prestation-gif yellow"><a href="#/prestation/logotypes-creation-identite"><img src="img/scroll-yellow.gif" alt=""></a></p>
						</div>				
					</div>		
				</article>

			</section>
		</section>

		<section id="realisation" class="level">

			<nav id="realisation-nav">
				<ul>
					<li><a href="#cdlp">1 <span>Club de la Presse de Strasbourg</span></a></li>
					<li><a href="#carre-habitat">2 <span>Carré Habitat</span></a></li>
					<li><a href="#garage-eric-muller">3 <span>Garage Eric Muller</span></a></li>
					<li><a href="#wassup">4 <span>Boutique Wassup</span></a></li>
				</ul>
			</nav>

			<article id="cdlp" class="realisations">
				<div class="container">
					<div class="left-container">
						<header>
							<h1>Nos réalisations</h1>
							<h2>Client</h2>
							<h3>Club de la Presse de Strasbourg</h3>
						</header>
						<div class="content">
							<p class="realisation-image">
								<img src="img/cdlp-mini.png" alt="Club de la Presse">
							</p>
							<h3>Projet</h3>
							<ul>
								<li>Création et intégration d’une Landing Page</li>
								<li>Mise en place d'une page visible uniquement à la première visite</li>
								<li>Amélioration et créations de modules</li>
							</ul>
							<p class="link">
								<a target="_blank" href="http://www.club-presse-strasbourg.com/">
									<span class="btn-top">Voir le site</span>
									<span class="btn-bottom">Voir le site</span>
								</a>
							</p>
						</div>
					</div>
				</div>
			</article>

			<article id="carre-habitat" class="realisations">
				<div class="container">
					<div class="left-container">
						<header>
							<h1>Nos réalisations</h1>
							<h2>Client</h2>
							<h3>Carré de l'habitat</h3>
						</header>
						<div class="content">
							<p class="realisation-image">
								<img src="img/carre-habitat-mini.png" alt="Carré Habitat">
							</p>
							<h3>Projet</h3>
							<ul>
								<li>Création et intégration d’une Landing Page</li>
								<li>Création d’une newsletter</li>
								<li>Elaboration d'un outil de gestion des inscrits</li>
							</ul>
							<p class="link">
								<a target="_blank" href="http://information.carre-habitat.com/">
									<span class="btn-top">Voir la landing page</span>
									<span class="btn-bottom">Voir la landing page</span>
								</a>
							</p>
						</div>
					</div>
				</div>
			</article>

			<article id="garage-eric-muller" class="realisations">
				<div class="container">
					<div class="left-container">
						<header>
							<h1>Nos réalisations</h1>
							<h2>Client</h2>
							<h3>Garage Eric Muller</h3>
						</header>
						<div class="content">
							<p class="realisation-image">
								<img src="img/garage-eric-muller-mini.png" alt="Carré Habitat">
							</p>
							<h3>Projet</h3>
							<ul>
								<li>Création du design</li>
								<li>Intégration du site internet</li>
								<li>Développement du site internet sous WordPress</li>
								<li>Création de modules spécifiques</li>
							</ul>
							<p class="link">
								<a target="_blank" href="http://www.garage-eric-muller.fr/">
									<span class="btn-top">Voir le site internet</span>
									<span class="btn-bottom">Voir le site internet</span>
								</a>
							</p>
						</div>
					</div>
				</div>
			</article>

			<article id="wassup" class="realisations">
				<div class="container">
					<div class="left-container">
						<header>
							<h1>Nos réalisations</h1>
							<h2>Client</h2>
							<h3>Wassup</h3>
						</header>
						<div class="content">
							<p class="realisation-image">
								<img src="img/wassup-mini.png" alt="Carré Habitat">
							</p>
							<h3>Projet</h3>
							<ul>
								<li>Création du design</li>
								<li>Intégration du site internet</li>
								<li>Mise en place d'une solution Ecommerce : PrestaShop</li>
							</ul>
							<p class="link">
								<a target="_blank" href="http://www.thatswassup.fr/">
									<span class="btn-top">Voir la boutique</span>
									<span class="btn-bottom">Voir la boutique</span>
								</a>
							</p>
						</div>
					</div>
				</div>
			</article>

			<canvas id="realisation-canvas"></canvas>

		</section>

		<section id="contact-agence-web-strasbourg" class="level">
			<article id="contact-1">
				<div class="right-container">
					<header>
						<h1>Nous <strong>contacter</strong></h1>
					</header>
					<div class="content">
						<form action="#/contact-agence-web-strasbourg" method="post">
							<p class="select">
								<select name="select" id="">
									<option value="Subject">Séléctionnez un sujet</option>
									<option value="J'ai un projet défini et j'aimerai en parler avec vous">J'ai un projet défini et j'aimerai en parler avec vous</option>
									<option value="J'ai besoin d'une prestation mais je n'ai pas d'idées particulières">J'ai besoin d'une prestation mais je n'ai pas d'idées particulières</option>
									<option value="J'ai une question technique concernant mon site">J'ai une question technique concernant mon site</option>
									<option value="Je veux juste boire un café et discuter">Je veux juste boire un café et discuter</option>
								</select>
							</p>
							<p class="text name"><input name="name" type="text" placeholder="Nom & Prénom"></p>
							<p class="text email"><input name="email" type="text" placeholder="Email"></p>
							<p class="text"><input name="phonenumber" type="text" placeholder="Téléphone"></p>
							<p class="textarea message"><textarea name="message" id="" cols="30" rows="10" placeholder="Message"></textarea></p>
							<p class="submit">
								<span id="submit-container">
									<span id="submit-background"></span>
									<button>Envoyer</button>
								</span>
							</p>
						</form>
						<div class="strasbourg block">
							<h3>Virgile <strong>Koch</strong></h3>
							<h4>Le créatif</h4>
							<p>+33 7 62 90 45 62 <br>
								<span class="socicon"><a target="_blank" href="https://www.flickr.com/photos/130771546@N04/">v</a></span>
								<span class="socicon"><a target="_blank" href="https://www.linkedin.com/profile/view?id=423628259">j</a></span>
								<span class="socicon"><a target="_blank" href="https://instagram.com/mugz4/">x</a></span> 
							</p>
						</div>
						<div class="ingwiller block">
							<h3>Thomas <strong>Hammer</strong></h3>
							<h4>Le geek</h4>
							<p>+33 6 20 16 75 32 <br>
								<span class="socicon"><a target="_blank" href="https://www.linkedin.com/profile/view?id=141889947">j</a></span>
								<span class="socicon"><a target="_blank" href="https://instagram.com/m4kakfou/">x</a></span> 
							</p>			
						</div>
					</div>					
				</div>
				<div class="video">
					<div>
						<video preload="auto" loop="" autoplay="autoplay" poster="img/poster.png">
	                		<source src="video/contact.mp4" type="video/mp4">
	            		</video>						
					</div>
				</div>
			</article>		
		</section>

	</section>

	<section id="mentions-legales">
		<article>
			<div class="remover-container">
				<div class="remover">
					<span class="bar-one"></span>
					<span class="bar-two"></span>					
				</div>
			</div>
			<h2>Informations légales</h2>
			<h3>1. Présentation du site.</h3>
			<p>En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
			<p><strong>Propriétaire</strong> : Hakolad – 79055001600014 – 17, rue de la brasserie 67340 Ingwiller<br />
			<strong>Créateur</strong> : <a href="http://www.hakolad.fr">Hakolad</a><br />
			<strong>Responsable publication</strong> : Virgile Koch & Thomas Hammer – hello@hakolad.fr<br />
			Le responsable publication est une personne physique ou une personne morale.<br />
			<strong>Webmaster</strong> : Thomas Hammer – hello@hakolad.fr<br />
			<strong>Hébergeur</strong> : Hakolad – 17, rue de la brasserie 67340 Ingwiller<br />
			Crédits : les mentions légales ont été générées et offertes par Subdelirium <a target="_blank" href="http://www.subdelirium.com/referencement/" alt="referencement site internet charente">référencement Charente</a></p>

			<h3>2. Conditions générales d’utilisation du site et des services proposés.</h3>
			<p>L’utilisation du site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> sont donc invités à les consulter de manière régulière.</p>
			<p>Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par Hakolad, qui s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention.</p>
			<p>Le site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> est mis à jour régulièrement par Virgile Koch & Thomas Hammer. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance.</p>
			<h3>3. Description des services fournis.</h3>
			<p>Le site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> a pour objet de fournir une information concernant l’ensemble des activités de la société.</p>
			<p>Hakolad s’efforce de fournir sur le site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> des informations aussi précises que possible. Toutefois, il ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.</p>
			<p>Tous les informations indiquées sur le site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> sont données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les renseignements figurant sur le site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.</p>
			<h3>4. Limitations contractuelles sur les données techniques.</h3>
			<p>Le site utilise la technologie JavaScript.</p>
			<p>Le site Internet ne pourra être tenu responsable de dommages matériels liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis-à-jour</p>
			<h3>5. Propriété intellectuelle et contrefaçons.</h3>
			<p>Hakolad est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels.</p>
			<p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de : Hakolad.</p>
			<p>Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>
			<h3>6. Limitations de responsabilité.</h3>
			<p>Hakolad ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site www.hakolad.fr, et résultant soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées au point 4, soit de l’apparition d’un bug ou d’une incompatibilité.</p>
			<p>Hakolad ne pourra également être tenue responsable des dommages indirects (tels par exemple qu’une perte de marché ou perte d’une chance) consécutifs à l’utilisation du site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a>.</p>
			<p>Des espaces interactifs (possibilité de poser des questions dans l’espace contact) sont à la disposition des utilisateurs. Hakolad se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. Le cas échéant, Hakolad se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie…).</p>
			<h3>7. Gestion des données personnelles.</h3>
			<p>En France, les données personnelles sont notamment protégées par la loi n° 78-87 du 6 janvier 1978, la loi n° 2004-801 du 6 août 2004, l'article L. 226-13 du Code pénal et la Directive Européenne du 24 octobre 1995.</p>
			<p>A l'occasion de l'utilisation du site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a>, peuvent êtres recueillies : l'URL des liens par l'intermédiaire desquels l'utilisateur a accédé au site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a>, le fournisseur d'accès de l'utilisateur, l'adresse de protocole Internet (IP) de l'utilisateur.</p>
			<p> En tout état de cause Hakolad ne collecte des informations personnelles relatives à l'utilisateur que pour le besoin de certains services proposés par le site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a>. L'utilisateur fournit ces informations en toute connaissance de cause, notamment lorsqu'il procède par lui-même à leur saisie. Il est alors précisé à l'utilisateur du site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> l’obligation ou non de fournir ces informations.</p>
			<p>Conformément aux dispositions des articles 38 et suivants de la loi 78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés, tout utilisateur dispose d’un droit d’accès, de rectification et d’opposition aux données personnelles le concernant, en effectuant sa demande écrite et signée, accompagnée d’une copie du titre d’identité avec signature du titulaire de la pièce, en précisant l’adresse à laquelle la réponse doit être envoyée.</p>
			<p>Aucune information personnelle de l'utilisateur du site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> n'est publiée à l'insu de l'utilisateur, échangée, transférée, cédée ou vendue sur un support quelconque à des tiers. Seule l'hypothèse du rachat de Hakolad et de ses droits permettrait la transmission des dites informations à l'éventuel acquéreur qui serait à son tour tenu de la même obligation de conservation et de modification des données vis à vis de l'utilisateur du site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a>.</p>
			<p>Le site n'est pas déclaré à la CNIL car il ne recueille pas d'informations personnelles. .</p>
			<p>Les bases de données sont protégées par les dispositions de la loi du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative à la protection juridique des bases de données.</p>
			<h3>8. Liens hypertextes et cookies.</h3>
			<p>Le site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> contient un certain nombre de liens hypertextes vers d’autres sites, mis en place avec l’autorisation de Hakolad. Cependant, Hakolad n’a pas la possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en conséquence aucune responsabilité de ce fait.</p>
			<p>La navigation sur le site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Un cookie est un fichier de petite taille, qui ne permet pas l’identification de l’utilisateur, mais qui enregistre des informations relatives à la navigation d’un ordinateur sur un site. Les données ainsi obtenues visent à faciliter la navigation ultérieure sur le site, et ont également vocation à permettre diverses mesures de fréquentation.</p>
			<p>Le refus d’installation d’un cookie peut entraîner l’impossibilité d’accéder à certains services. L’utilisateur peut toutefois configurer son ordinateur de la manière suivante, pour refuser l’installation des cookies :</p>
			<p>Sous Internet Explorer : onglet outil (pictogramme en forme de rouage en haut a droite) / options internet. Cliquez sur Confidentialité et choisissez Bloquer tous les cookies. Validez sur Ok.</p>
			<p>Sous Firefox : en haut de la fenêtre du navigateur, cliquez sur le bouton Firefox, puis aller dans l'onglet Options. Cliquer sur l'onglet Vie privée.
			Paramétrez les Règles de conservation sur : utiliser les paramètres personnalisés pour l'historique. Enfin décochez-la pour désactiver les cookies.</p>
			<p>Sous Safari : Cliquez en haut à droite du navigateur sur le pictogramme de menu (symbolisé par un rouage). Sélectionnez Paramètres. Cliquez sur Afficher les paramètres avancés. Dans la section "Confidentialité", cliquez sur Paramètres de contenu. Dans la section "Cookies", vous pouvez bloquer les cookies.</p>
			<p>Sous Chrome : Cliquez en haut à droite du navigateur sur le pictogramme de menu (symbolisé par trois lignes horizontales). Sélectionnez Paramètres. Cliquez sur Afficher les paramètres avancés. Dans la section "Confidentialité", cliquez sur préférences. Dans l'onglet "Confidentialité", vous pouvez bloquer les cookies.</p>

			<h3>9. Droit applicable et attribution de juridiction.</h3>
			<p>Tout litige en relation avec l’utilisation du site <a href="http://www.hakolad.fr/" title="Hakolad - www.hakolad.fr">www.hakolad.fr</a> est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.</p>
			<h3>10. Les principales lois concernées.</h3>
			<p>Loi n° 78-17 du 6 janvier 1978, notamment modifiée par la loi n° 2004-801 du 6 août 2004 relative à l'informatique, aux fichiers et aux libertés.</p>
			<p> Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.</p>
			<h3>11. Lexique.</h3>
			<p>Utilisateur : Internaute se connectant, utilisant le site susnommé.</p>
			<p>Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).</p>

			<h3>Droits d'auteurs des photos du site</h3>
			<p>photo page accueil : <br><a href="https://www.flickr.com/photos/highlights6" target="_blank">highlights6</a></p>
			<p>Photo "C'est qui" : <br><a href="https://stocksnap.io/author/3685" target="_blank">Barn Images</a></p>
			<p>Photo "C'est quoi" : <br><a href="https://www.flickr.com/photos/fatmandy/" target="_blank">Chris Frewin</a></p>
		</article>
	</section>

	<footer id="footer">
		<p>© Hakolad - 2015 - <a href="#/mentions-legales">Mentions légales</a></p>
	</footer>
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/TweenMax.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/gsap/1.16.1/jquery.gsap.min.js"></script>
	<script src="js/plugins.js"></script>
	<script src="js/app.min.js"></script>
	<script>
		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
		})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

		ga('create', 'UA-63697860-1', 'auto');
		ga('send', 'pageview');
	</script>
</body>
</html>