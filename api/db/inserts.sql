
ALTER TABLE `hint` CHANGE `indication` `type` ENUM("text","url") CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL;


insert into place(lng, lat, indication) values(),(),(),(),();

INSERT INTO `destination` (`id`, `name`, `lng`, `lat`) VALUES (NULL, 'Toulouse', '1.450488', '43.607489');


INSERT INTO `destination` (`name`, `lng`, `lat`) VALUES ('Le Mont Saint Michel','-1.5120517','48.6360033'),
                                                       ('Disneyland Paris','2.7736192','48.8722344');
