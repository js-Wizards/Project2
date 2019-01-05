DELIMITER ;;
CREATE TRIGGER before_insert_events
BEFORE INSERT ON events
FOR EACH ROW
BEGIN
  IF new.uuid IS NULL THEN
    SET new.uuid = uuid();
  END IF;
END
;;
DELIMITER ;

SHOW TRIGGERS;