
ALTER TABLE `hint` CHANGE `indication` `type` ENUM("text","url") CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL;


insert into place(lng, lat, indication) values(),(),(),(),();

INSERT INTO `destination` (`id`, `name`, `lng`, `lat`) VALUES (NULL, 'Toulouse', '1.450488', '43.607489');
