import Button from "@/components/Button";
import styles from "./QuestionsForm.module.scss";

function QuestionsForm() {
  return (
    <div className={styles.questionsContent}>
      <div className={styles.line}></div>
      <div className={styles.userIn4}>
        <input type="text" placeholder="Nhập tên vào đây..." />
        <input type="email" placeholder="example@gmail.com" />
        <input type="text" placeholder="Nhập số điện thoại vào đây" />
      </div>
      <div className={styles.contentRating}>
        <label className={styles.subTitle}>Nội dung</label>

        <textarea
          className={styles.contentInput}
          type="text"
          placeholder="Viết nội dung đánh giá của bạn"
        />
      </div>
      <Button draculaButton className={styles.btnQuestion}>
        Gửi câu hỏi
      </Button>
    </div>
  );
}

export default QuestionsForm;
