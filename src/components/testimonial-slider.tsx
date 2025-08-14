"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { USER_TESTIMONIALS } from "@/constants";

const TestimonialsSlider = () => {
	const [sliderRef] = useKeenSlider({
		loop: true,
		slides: {
			perView: 1,
			spacing: 16,
		},
		breakpoints: {
			"(min-width: 768px)": {
				slides: { perView: 2, spacing: 24 },
			},
			"(min-width: 1024px)": {
				slides: { perView: 3, spacing: 32 },
			},
		},
		created(s) {
			let timeout: any;
			let mouseOver = false;
			function clearNextTimeout() {
				clearTimeout(timeout);
			}
			function nextTimeout() {
				clearTimeout(timeout);
				if (mouseOver) return;
				timeout = setTimeout(() => {
					s.next();
				}, 1000);
			}
			s.container.addEventListener("mouseover", () => {
				mouseOver = true;
				clearNextTimeout();
			});
			s.container.addEventListener("mouseout", () => {
				mouseOver = false;
				nextTimeout();
			});
			nextTimeout();
		},
	});

	return (
		<section className="max-w-7xl mx-auto px-6 pb-20">
			<h2 className="text-4xl md:text-5xl font-bold text-center mb-14">
				<span className="text-foreground">What People </span>
				<span className="text-primary">Are Saying</span>
			</h2>

			<div ref={sliderRef} className="keen-slider">
				{USER_TESTIMONIALS.map((t, index) => (
					<div
						key={index}
						className="keen-slider__slide bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center"
					>
						<div className="w-20 h-20 mb-4 rounded-full overflow-hidden border">
							<img
								src={t.avatar}
								alt={t.name}
								width={80}
								height={80}
								className="object-cover size-full"
							/>
						</div>
						<p className="text-muted-foreground mb-4">
							<span className="text-primary">“</span>
							{t.quote}
							<span className="text-primary">”</span>
						</p>
						<p className="font-semibold">{t.name}</p>
						<p className="text-sm text-primary">{t.role}</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default TestimonialsSlider;
