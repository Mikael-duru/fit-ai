"use client";

import { useKeenSlider } from "keen-slider/react.es";
import "keen-slider/keen-slider.min.css";

import { USER_TESTIMONIALS } from "@/constants";

const TestimonialsSlider = () => {
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
			slides: {
				perView: 1,
				spacing: 8,
			},
			breakpoints: {
				"(min-width: 768px)": {
					slides: { perView: 2, spacing: 16 },
				},
				"(min-width: 1024px)": {
					slides: { perView: 3, spacing: 24 },
				},
			},
		},
		[
			// Autoplay plugin
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = false;

				function clearNextTimeout() {
					clearTimeout(timeout);
				}

				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 3000);
				}

				slider.on("created", () => {
					slider.container.addEventListener("mouseover", () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener("mouseout", () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});

				slider.on("dragStarted", clearNextTimeout);
				slider.on("animationEnded", nextTimeout);
				slider.on("updated", nextTimeout);
			},
		]
	);

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

			{/* Slider navigation */}
			<div className="flex justify-center mt-6">
				<button
					onClick={(e) => {
						e.stopPropagation();
						instanceRef.current?.prev();
					}}
					className="mx-2 p-2 bg-card border border-border rounded-full hover:bg-primary/10 transition"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>
				<button
					onClick={(e) => {
						e.stopPropagation();
						instanceRef.current?.next();
					}}
					className="mx-2 p-2 bg-card border border-border rounded-full hover:bg-primary/10 transition"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M8.25 4.5l7.5 7.5-7.5 7.5"
						/>
					</svg>
				</button>
			</div>
		</section>
	);
};

export default TestimonialsSlider;
