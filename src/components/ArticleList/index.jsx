import PropTypes from "prop-types";
import styles from "./ArticleList.module.scss";

function ArticleList({ articles }) {
  return (
    <div className={styles.articleList}>
      {articles.map((article) => (
        <div key={article.id} className={styles.articleItem}>
          <img src={article.image} alt="" />
          <div className={styles.content}>
            <h4 className={styles.title}>{article.title}</h4>
            <p className={styles.desc}>
              Viết bởi <strong>{article.author}</strong> vào lúc {article.date}
            </p>
            <div className={styles.line}></div>
          </div>
        </div>
      ))}
    </div>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.array,
};
export default ArticleList;
