type RatingStarsProps = {
  value: number;
  onChange: (value: number) => void;
};

export function RatingStars({ value, onChange }: RatingStarsProps) {
  return (
    <div className="rating-stars" role="radiogroup" aria-label="主题评分">
      {[1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          type="button"
          role="radio"
          aria-checked={value === score}
          className={`star ${score <= value ? "active" : ""}`}
          onClick={() => onChange(score)}
        >
          ★
        </button>
      ))}
    </div>
  );
}
