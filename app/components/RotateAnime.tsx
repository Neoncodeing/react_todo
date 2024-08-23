const RotateAnime = () => {
	return (
		// <svg width="300" height="300">
		// 	<path
		// 		id="circlePath"
		// 		d="M 150 150 m 0 -112.5 a 112.5 112.5 0 1 1 0 225 a 112.5 112.5 0 1 1 0 -225"
		// 		fill="none"
		// 	/>
		// 	<text>
		// 		<textPath xlinkHref="#circlePath">
		// 			TODO App by React + Next.js
		// 		</textPath>
		// 	</text>
		// </svg>
		<div className="rotate_container">
			<div className="rotate_anime">
				<svg className="circleText" viewBox="0 0 100 100">
					<path
						id="circle"
						className="circleText__circle"
						d="M 0 50 A 50 50 0 1 1 0 51 z"
					/>
					<text className="circleText__text">
						<textPath xlinkHref="#circle">
						const title = "TODO App by React + Next.js"
						</textPath>
					</text>
				</svg>
			</div>
		</div>
	);
};

export default RotateAnime;
