ALTER TABLE `hint` CHANGE `indication` `type` ENUM("text","url") CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL;


insert into place(lng, lat, indication) values(),(),(),(),();

INSERT INTO `destination` (`id`, `name`, `lng`, `lat`) VALUES (NULL, 'Toulouse', '1.450488', '43.607489');

INSERT INTO `place` (`id`, `lng`, `lat`, `indication`) VALUES
(NULL, '7.266555', '43.716896', 'Château de Valrose'),
(NULL, '7.753173', '48.580887', 'Palais Rohan'),
(NULL, '0.103315', '49.485045', 'Musée d''art moderne André Malraux'),
(NULL, '1.265599', '45.860447', 'Parc de l''Aurence'),
(NULL, '5.069667', '47.311461', 'Université de Bourgogne'),
(NULL, '3.069648', '50.640208', 'Notre Dame de la Treille'),
(NULL, '1.865608', '50.966423', 'Port de Calais');
