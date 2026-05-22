-- AlterTable
CREATE SEQUENCE mypage_templateid_seq;
ALTER TABLE "MyPage" ALTER COLUMN "templateId" SET DEFAULT nextval('mypage_templateid_seq');
ALTER SEQUENCE mypage_templateid_seq OWNED BY "MyPage"."templateId";
