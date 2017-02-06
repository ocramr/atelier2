
ALTER TABLE `hint` CHANGE `indication` `type` ENUM("text","url") CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL;


insert into place(lng, lat, indication) values(),(),(),(),();

INSERT INTO `destination` (`id`, `name`, `lng`, `lat`) VALUES (NULL, 'Toulouse', '1.450488', '43.607489');
INSERT INTO `destination` (`id`, `name`, `lng`, `lat`) VALUES (NULL, 'Le havre', '0.121646', '49.527592');

INSERT INTO `hint` (`id`, `value`, `type`, `id_destination`) VALUES (NULL, 'Commune du du Sud-Ouest de France', 'text', '1');
INSERT INTO `hint` (`id`, `value`, `type`, `id_destination`) VALUES (NULL, 'Basilique Saint-Sernin', 'text', '1');
INSERT INTO `hint` (`id`, `value`, `type`, `id_destination`) VALUES (NULL, 'Université Paul Sabatier', 'text', '1');
INSERT INTO `hint` (`id`, `value`, `type`, `id_destination`) VALUES (NULL, 'La ville rose', 'text', '1');
INSERT INTO `hint` (`id`, `value`, `type`, `id_destination`) VALUES (NULL, 'la quatrième commune la plus peuplée de France', 'text', '1');


INSERT INTO `hint` (`id`, `value`, `type`, `id_destination`) VALUES (NULL, 'Située sur la rive droite de l''estuaire de la Seine', 'text', '2');
INSERT INTO `hint` (`id`, `value`, `type`, `id_destination`) VALUES (NULL, 'Son port est le deuxième de France pour le trafic total, et le premier port français pour les conteneurs.', 'text', '2');
INSERT INTO `hint` (`id`, `value`, `type`, `id_destination`) VALUES (NULL, 'Musée d''art moderne André-Malraux', 'text', '2');
INSERT INTO `hint` (`id`, `value`, `type`, `id_destination`) VALUES (NULL, 'Saint Thomas Basket', 'text', '2');
