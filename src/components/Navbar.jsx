import { HeartHalf, Info, ShareFat } from "@phosphor-icons/react";
import { Link } from "wouter";

export default function Navbar() {
	return (
		<>
			<div className="w-full bg-white/10 blur-3xl -top-8 absolute z-30 h-32"></div>
			<div className=" bg-gradient-to-b from-black to-transparent inset-0 top-0 fixed h-40 z-10"></div>
			<nav className="container z-50 flex justify-between items-center py-4 sticky top-0">
				<Link href="/">
					<a>
						<svg
							width="116"
							height="34"
							viewBox="0 0 116 34"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								opacity="0.2"
								d="M5.18628 14.3925L11.6231 16.8734L2.7375 20.7762L1.14778 17.23C1.09587 17.1127 1.06774 16.9862 1.06502 16.858C1.06231 16.7297 1.08506 16.6022 1.13197 16.4828C1.17887 16.3634 1.249 16.2545 1.33828 16.1624C1.42756 16.0702 1.53423 15.9967 1.65211 15.9461L5.18628 14.3925ZM20.9818 8.51566C20.8734 8.27929 20.6762 8.09521 20.4329 8.00338C20.1896 7.91154 19.9199 7.91937 19.6824 8.02516L12.158 11.3307L18.5947 13.8104L22.5717 12.0631L20.9818 8.51566Z"
								fill="white"
							/>
							<path
								d="M24.2625 16.3818L10.1963 18.5919L22.9688 12.9801C23.0897 12.927 23.1989 12.8506 23.2901 12.7551C23.3813 12.6596 23.4527 12.547 23.5002 12.4238C23.5476 12.3006 23.5702 12.1692 23.5666 12.0372C23.5631 11.9052 23.5334 11.7753 23.4793 11.6548L21.8896 8.10858C21.6726 7.63197 21.2765 7.26003 20.7873 7.07331C20.298 6.8866 19.7549 6.90013 19.2755 7.111L1.25 15.03C1.00982 15.1343 0.792873 15.2855 0.611853 15.4747C0.430833 15.6639 0.289382 15.8874 0.19578 16.1319C0.101026 16.3739 0.0558659 16.6324 0.0629835 16.8921C0.0701011 17.1518 0.129351 17.4075 0.237212 17.6438L1.68797 20.8854C1.69068 20.9027 1.69359 20.9213 1.6965 20.9398L3.40396 31.8064C3.48629 32.3305 3.77341 32.8003 4.20216 33.1126C4.63091 33.4249 5.16616 33.5541 5.69016 33.4718L25.4478 30.3673C25.9718 30.285 26.4416 29.9978 26.7539 29.5691C27.0662 29.1404 27.1954 28.6051 27.1131 28.0811L25.4056 17.2144C25.3644 16.9524 25.2209 16.7175 25.0065 16.5614C24.7921 16.4052 24.5245 16.3406 24.2625 16.3818ZM20.0768 8.9413L21.246 11.5502L18.5692 12.73L14.7817 11.2702L20.0768 8.9413ZM12.1831 12.4086L15.9706 13.8684L11.5983 15.7891L7.81116 14.3318L12.1831 12.4086ZM3.24418 19.4591L2.07485 16.849L5.21138 15.4704L8.99927 16.9326L3.24418 19.4591ZM25.1373 28.3915L5.37971 31.496L3.82749 21.6172L23.5851 18.5128L25.1373 28.3915Z"
								fill="white"
							/>
							<path
								d="M27.8096 8.31088C28.2029 7.76072 28.7098 7.30141 29.2959 6.96399C30.585 6.23637 32.0288 6.33047 33.362 7.2287C34.0565 7.69667 34.6622 7.75962 35.2806 7.43469C35.6175 7.24681 35.9111 6.99015 36.1424 6.68139C36.2914 6.462 36.5214 6.31079 36.782 6.26103C37.0425 6.21127 37.3121 6.26703 37.5315 6.41605C37.7509 6.56507 37.9021 6.79515 37.9518 7.05566C38.0016 7.31616 37.9458 7.58577 37.7968 7.80516C36.8986 9.13829 34.6785 10.5273 32.2444 8.88734C31.5499 8.41936 30.9442 8.35642 30.3258 8.68135C29.9889 8.86923 29.6953 9.12589 29.464 9.43465C29.3903 9.54328 29.2958 9.63632 29.1861 9.70844C29.0763 9.78057 28.9534 9.83037 28.8244 9.85501C28.6955 9.87965 28.5629 9.87864 28.4343 9.85204C28.3057 9.82544 28.1836 9.77377 28.0749 9.69999C27.9663 9.6262 27.8733 9.53174 27.8011 9.42199C27.729 9.31225 27.6792 9.18938 27.6546 9.06039C27.6299 8.9314 27.6309 8.79881 27.6575 8.67021C27.6841 8.54161 27.7358 8.41951 27.8096 8.31088ZM27.5567 3.31728L29.2331 0.829319C29.3813 0.60937 29.6108 0.4573 29.8711 0.406563C30.1314 0.355826 30.4012 0.410579 30.6212 0.558775C30.8411 0.706971 30.9932 0.936473 31.0439 1.19679C31.0947 1.45711 31.0399 1.72692 30.8917 1.94687L29.2154 4.43483C29.0672 4.65478 28.8377 4.80685 28.5774 4.85758C28.317 4.90832 28.0472 4.85357 27.8273 4.70537C27.6073 4.55718 27.4553 4.32767 27.4045 4.06736C27.3538 3.80704 27.4085 3.53723 27.5567 3.31728ZM32.3441 18.9537C32.3692 19.0826 32.3686 19.2152 32.3424 19.3439C32.3163 19.4726 32.265 19.5949 32.1916 19.7038C32.1181 19.8127 32.024 19.906 31.9144 19.9785C31.8049 20.051 31.6822 20.1012 31.5533 20.1263C31.4244 20.1514 31.2918 20.1508 31.1631 20.1246C31.0344 20.0984 30.9121 20.0472 30.8032 19.9737C30.6943 19.9003 30.6009 19.8061 30.5284 19.6966C30.456 19.5871 30.4057 19.4644 30.3807 19.3355L29.8396 16.5593C29.7888 16.2988 29.8436 16.0288 29.9919 15.8088C30.1402 15.5887 30.3698 15.4366 30.6302 15.3858C30.8907 15.335 31.1607 15.3898 31.3807 15.5381C31.6008 15.6864 31.753 15.916 31.8037 16.1765L32.3441 18.9537ZM35.8349 14.8622L32.7882 14.0152C32.5326 13.9441 32.3158 13.7745 32.1853 13.5435C32.0549 13.3126 32.0215 13.0393 32.0925 12.7838C32.1636 12.5282 32.3332 12.3114 32.5641 12.1809C32.7951 12.0504 33.0684 12.0171 33.3239 12.0881L36.3707 12.9351C36.6262 13.0061 36.8431 13.1758 36.9735 13.4067C37.104 13.6377 37.1374 13.911 37.0663 14.1665C36.9953 14.422 36.8256 14.6389 36.5947 14.7694C36.3638 14.8998 36.0905 14.9332 35.8349 14.8622Z"
								fill="white"
							/>
							<path
								d="M52.3446 9.61364H49.4583C49.4431 9.43561 49.3806 9.2822 49.2708 9.15341C49.1609 9.02462 49.0189 8.92614 48.8446 8.85795C48.6742 8.78598 48.4848 8.75 48.2764 8.75C48.0075 8.75 47.7764 8.79924 47.5833 8.89773C47.3901 8.99621 47.2954 9.13636 47.2992 9.31818C47.2954 9.44697 47.3503 9.56629 47.4639 9.67614C47.5814 9.78598 47.8067 9.87121 48.1401 9.93182L49.9128 10.25C50.8067 10.4129 51.4715 10.6875 51.9071 11.0739C52.3465 11.4564 52.5681 11.9697 52.5719 12.6136C52.5681 13.2348 52.3825 13.7746 52.0151 14.233C51.6514 14.6875 51.1533 15.0398 50.5208 15.2898C49.892 15.536 49.1742 15.6591 48.3674 15.6591C47.034 15.6591 45.9905 15.3864 45.2367 14.8409C44.4867 14.2955 44.0681 13.5758 43.981 12.6818H47.0946C47.1363 12.9583 47.2727 13.1723 47.5037 13.3239C47.7386 13.4716 48.034 13.5455 48.3901 13.5455C48.678 13.5455 48.9147 13.4962 49.1003 13.3977C49.2897 13.2992 49.3863 13.1591 49.3901 12.9773C49.3863 12.8106 49.303 12.678 49.1401 12.5795C48.981 12.4811 48.731 12.4015 48.3901 12.3409L46.8446 12.0682C45.9545 11.9129 45.2878 11.6174 44.8446 11.1818C44.4014 10.7462 44.1817 10.1856 44.1855 9.5C44.1817 8.89394 44.3408 8.38068 44.6628 7.96023C44.9886 7.53598 45.4526 7.21401 46.0549 6.99432C46.6609 6.77083 47.3787 6.65909 48.2083 6.65909C49.4696 6.65909 50.4639 6.92045 51.1912 7.44318C51.9223 7.96591 52.3067 8.68939 52.3446 9.61364Z"
								fill="white"
							/>
							<path
								d="M59.4327 11.6818V6.77273H62.5691V15.5H59.5918V13.8409H59.5009C59.3115 14.3977 58.98 14.8333 58.5066 15.1477C58.0331 15.4583 57.4706 15.6136 56.8191 15.6136C56.2092 15.6136 55.6751 15.4735 55.2168 15.1932C54.7622 14.9129 54.4081 14.5265 54.1543 14.0341C53.9043 13.5417 53.7774 12.9773 53.7736 12.3409V6.77273H56.91V11.6818C56.9138 12.1136 57.0236 12.4527 57.2395 12.6989C57.4592 12.9451 57.766 13.0682 58.16 13.0682C58.4213 13.0682 58.6467 13.0133 58.8361 12.9034C59.0293 12.7898 59.177 12.6307 59.2793 12.4261C59.3853 12.2178 59.4365 11.9697 59.4327 11.6818Z"
								fill="white"
							/>
							<path
								d="M64.1642 15.5V6.77273H67.2097V8.43182H67.3006C67.4597 7.81818 67.7116 7.36932 68.0563 7.08523C68.4048 6.80114 68.812 6.65909 69.2779 6.65909C69.4142 6.65909 69.5487 6.67045 69.6813 6.69318C69.8176 6.71212 69.9483 6.74053 70.0733 6.77841V9.45455C69.918 9.40152 69.7267 9.36174 69.4995 9.33523C69.2722 9.30871 69.0771 9.29545 68.9142 9.29545C68.6074 9.29545 68.3309 9.36553 68.0847 9.50568C67.8423 9.64205 67.651 9.83523 67.5108 10.0852C67.3707 10.3314 67.3006 10.6212 67.3006 10.9545V15.5H64.1642Z"
								fill="white"
							/>
							<path
								d="M71.1017 18.7727V6.77273H74.2154V8.29545H74.2835C74.3972 8 74.5638 7.72917 74.7835 7.48295C75.0032 7.23295 75.276 7.03409 75.6017 6.88636C75.9275 6.73485 76.3063 6.65909 76.7381 6.65909C77.3138 6.65909 77.8612 6.8125 78.3801 7.11932C78.9029 7.42614 79.3271 7.90909 79.6529 8.56818C79.9824 9.22727 80.1472 10.0833 80.1472 11.1364C80.1472 12.1439 79.99 12.9792 79.6756 13.642C79.365 14.3049 78.9483 14.7992 78.4256 15.125C77.9067 15.4508 77.3366 15.6136 76.7154 15.6136C76.3063 15.6136 75.9407 15.5473 75.6188 15.4148C75.3006 15.2784 75.0279 15.0947 74.8006 14.8636C74.5771 14.6288 74.4048 14.3636 74.2835 14.0682H74.2381V18.7727H71.1017ZM74.1699 11.1364C74.1699 11.5606 74.2248 11.928 74.3347 12.2386C74.4483 12.5455 74.6074 12.7841 74.812 12.9545C75.0203 13.1212 75.2684 13.2045 75.5563 13.2045C75.8442 13.2045 76.0885 13.1231 76.2892 12.9602C76.4938 12.7936 76.6491 12.5568 76.7551 12.25C76.865 11.9394 76.9199 11.5682 76.9199 11.1364C76.9199 10.7045 76.865 10.3352 76.7551 10.0284C76.6491 9.7178 76.4938 9.48106 76.2892 9.31818C76.0885 9.15151 75.8442 9.06818 75.5563 9.06818C75.2684 9.06818 75.0203 9.15151 74.812 9.31818C74.6074 9.48106 74.4483 9.7178 74.3347 10.0284C74.2248 10.3352 74.1699 10.7045 74.1699 11.1364Z"
								fill="white"
							/>
							<path
								d="M81.4611 15.5V6.77273H84.5066V8.43182H84.5975C84.7566 7.81818 85.0084 7.36932 85.3531 7.08523C85.7016 6.80114 86.1088 6.65909 86.5747 6.65909C86.7111 6.65909 86.8456 6.67045 86.9781 6.69318C87.1145 6.71212 87.2452 6.74053 87.3702 6.77841V9.45455C87.2149 9.40152 87.0236 9.36174 86.7963 9.33523C86.5691 9.30871 86.374 9.29545 86.2111 9.29545C85.9043 9.29545 85.6278 9.36553 85.3816 9.50568C85.1391 9.64205 84.9478 9.83523 84.8077 10.0852C84.6675 10.3314 84.5975 10.6212 84.5975 10.9545V15.5H81.4611Z"
								fill="white"
							/>
							<path
								d="M88.3986 15.5V6.77273H91.535V15.5H88.3986ZM89.9668 5.86364C89.5425 5.86364 89.1789 5.72348 88.8759 5.44318C88.5728 5.16288 88.4213 4.82576 88.4213 4.43182C88.4213 4.03788 88.5728 3.70076 88.8759 3.42045C89.1789 3.14015 89.5425 3 89.9668 3C90.3948 3 90.7585 3.14015 91.0577 3.42045C91.3607 3.70076 91.5122 4.03788 91.5122 4.43182C91.5122 4.82576 91.3607 5.16288 91.0577 5.44318C90.7585 5.72348 90.3948 5.86364 89.9668 5.86364Z"
								fill="white"
							/>
							<path
								d="M101.11 9.61364H98.2239C98.2087 9.43561 98.1462 9.2822 98.0364 9.15341C97.9265 9.02462 97.7845 8.92614 97.6102 8.85795C97.4398 8.78598 97.2504 8.75 97.0421 8.75C96.7731 8.75 96.5421 8.79924 96.3489 8.89773C96.1557 8.99621 96.061 9.13636 96.0648 9.31818C96.061 9.44697 96.1159 9.56629 96.2296 9.67614C96.347 9.78598 96.5724 9.87121 96.9057 9.93182L98.6784 10.25C99.5724 10.4129 100.237 10.6875 100.673 11.0739C101.112 11.4564 101.334 11.9697 101.338 12.6136C101.334 13.2348 101.148 13.7746 100.781 14.233C100.417 14.6875 99.919 15.0398 99.2864 15.2898C98.6576 15.536 97.9398 15.6591 97.133 15.6591C95.7996 15.6591 94.7561 15.3864 94.0023 14.8409C93.2523 14.2955 92.8337 13.5758 92.7466 12.6818H95.8602C95.9019 12.9583 96.0383 13.1723 96.2693 13.3239C96.5042 13.4716 96.7996 13.5455 97.1557 13.5455C97.4436 13.5455 97.6803 13.4962 97.8659 13.3977C98.0553 13.2992 98.1519 13.1591 98.1557 12.9773C98.1519 12.8106 98.0686 12.678 97.9057 12.5795C97.7466 12.4811 97.4966 12.4015 97.1557 12.3409L95.6102 12.0682C94.7201 11.9129 94.0534 11.6174 93.6102 11.1818C93.1671 10.7462 92.9474 10.1856 92.9512 9.5C92.9474 8.89394 93.1065 8.38068 93.4284 7.96023C93.7542 7.53598 94.2182 7.21401 94.8205 6.99432C95.4265 6.77083 96.1443 6.65909 96.9739 6.65909C98.2352 6.65909 99.2296 6.92045 99.9568 7.44318C100.688 7.96591 101.072 8.68939 101.11 9.61364Z"
								fill="white"
							/>
							<path
								d="M106.721 15.6591C105.789 15.6591 104.986 15.4811 104.312 15.125C103.641 14.7652 103.124 14.25 102.761 13.5795C102.401 12.9053 102.221 12.0985 102.221 11.1591C102.221 10.2576 102.403 9.4697 102.766 8.79545C103.13 8.12121 103.643 7.59659 104.306 7.22159C104.969 6.84659 105.751 6.65909 106.653 6.65909C107.312 6.65909 107.909 6.76136 108.443 6.96591C108.977 7.17045 109.433 7.4678 109.812 7.85795C110.191 8.24432 110.482 8.71402 110.687 9.26705C110.891 9.82008 110.994 10.4432 110.994 11.1364V11.8636H103.198V10.1364H108.107C108.104 9.88636 108.039 9.66667 107.914 9.47727C107.793 9.28409 107.628 9.13447 107.42 9.02841C107.215 8.91856 106.982 8.86364 106.721 8.86364C106.467 8.86364 106.234 8.91856 106.022 9.02841C105.81 9.13447 105.64 9.2822 105.511 9.47159C105.386 9.66098 105.32 9.88258 105.312 10.1364V12C105.312 12.2803 105.371 12.5303 105.488 12.75C105.606 12.9697 105.774 13.142 105.994 13.267C106.213 13.392 106.479 13.4545 106.789 13.4545C107.005 13.4545 107.202 13.4242 107.38 13.3636C107.562 13.303 107.717 13.2159 107.846 13.1023C107.975 12.9848 108.07 12.8447 108.13 12.6818H110.994C110.895 13.2879 110.662 13.8144 110.295 14.2614C109.927 14.7045 109.441 15.0492 108.835 15.2955C108.232 15.5379 107.528 15.6591 106.721 15.6591Z"
								fill="white"
							/>
							<path
								d="M113.978 15.6818C113.539 15.6818 113.162 15.5284 112.847 15.2216C112.537 14.911 112.383 14.5341 112.387 14.0909C112.383 13.6591 112.537 13.2898 112.847 12.983C113.162 12.6761 113.539 12.5227 113.978 12.5227C114.395 12.5227 114.762 12.6761 115.08 12.983C115.402 13.2898 115.565 13.6591 115.569 14.0909C115.565 14.3864 115.488 14.6553 115.336 14.8977C115.188 15.1364 114.995 15.3277 114.757 15.4716C114.518 15.6117 114.258 15.6818 113.978 15.6818Z"
								fill="white"
							/>
							<path
								d="M44.3674 30.5V21.7727H47.3446V23.4318H47.4355C47.6174 22.8864 47.928 22.4545 48.3674 22.1364C48.8067 21.8182 49.3295 21.6591 49.9355 21.6591C50.5492 21.6591 51.0776 21.822 51.5208 22.1477C51.9639 22.4697 52.231 22.8977 52.3219 23.4318H52.4128C52.5605 22.8977 52.8749 22.4697 53.356 22.1477C53.837 21.822 54.4014 21.6591 55.0492 21.6591C55.8863 21.6591 56.5643 21.928 57.0833 22.4659C57.606 23.0038 57.8674 23.7197 57.8674 24.6136V30.5H54.731V25.4091C54.731 25.0265 54.6344 24.7273 54.4412 24.5114C54.248 24.2917 53.9886 24.1818 53.6628 24.1818C53.3408 24.1818 53.0852 24.2917 52.8958 24.5114C52.7102 24.7273 52.6174 25.0265 52.6174 25.4091V30.5H49.6174V25.4091C49.6174 25.0265 49.5208 24.7273 49.3276 24.5114C49.1344 24.2917 48.8749 24.1818 48.5492 24.1818C48.3333 24.1818 48.1477 24.2311 47.9924 24.3295C47.837 24.428 47.7158 24.5701 47.6287 24.7557C47.5454 24.9375 47.5037 25.1553 47.5037 25.4091V30.5H44.3674Z"
								fill="white"
							/>
							<path
								d="M63.6188 30.6591C62.6718 30.6591 61.8612 30.4716 61.187 30.0966C60.5127 29.7178 59.9957 29.1913 59.6358 28.517C59.276 27.839 59.096 27.053 59.096 26.1591C59.096 25.2652 59.276 24.4811 59.6358 23.8068C59.9957 23.1288 60.5127 22.6023 61.187 22.2273C61.8612 21.8485 62.6718 21.6591 63.6188 21.6591C64.5657 21.6591 65.3763 21.8485 66.0506 22.2273C66.7248 22.6023 67.2419 23.1288 67.6017 23.8068C67.9616 24.4811 68.1415 25.2652 68.1415 26.1591C68.1415 27.053 67.9616 27.839 67.6017 28.517C67.2419 29.1913 66.7248 29.7178 66.0506 30.0966C65.3763 30.4716 64.5657 30.6591 63.6188 30.6591ZM63.6415 28.3409C63.9066 28.3409 64.1358 28.2519 64.329 28.0739C64.5222 27.8958 64.6718 27.642 64.7779 27.3125C64.8839 26.983 64.937 26.5909 64.937 26.1364C64.937 25.678 64.8839 25.286 64.7779 24.9602C64.6718 24.6307 64.5222 24.3769 64.329 24.1989C64.1358 24.0208 63.9066 23.9318 63.6415 23.9318C63.3612 23.9318 63.1207 24.0208 62.9199 24.1989C62.7192 24.3769 62.5657 24.6307 62.4597 24.9602C62.3536 25.286 62.3006 25.678 62.3006 26.1364C62.3006 26.5909 62.3536 26.983 62.4597 27.3125C62.5657 27.642 62.7192 27.8958 62.9199 28.0739C63.1207 28.2519 63.3612 28.3409 63.6415 28.3409Z"
								fill="white"
							/>
							<path
								d="M77.9441 21.7727L75.0122 30.5H71.3759L68.4441 21.7727H71.7395L73.1486 27.5455H73.2395L74.6486 21.7727H77.9441Z"
								fill="white"
							/>
							<path
								d="M78.8361 30.5V21.7727H81.9725V30.5H78.8361ZM80.4043 20.8636C79.98 20.8636 79.6164 20.7235 79.3134 20.4432C79.0103 20.1629 78.8588 19.8258 78.8588 19.4318C78.8588 19.0379 79.0103 18.7008 79.3134 18.4205C79.6164 18.1402 79.98 18 80.4043 18C80.8323 18 81.196 18.1402 81.4952 18.4205C81.7982 18.7008 81.9497 19.0379 81.9497 19.4318C81.9497 19.8258 81.7982 20.1629 81.4952 20.4432C81.196 20.7235 80.8323 20.8636 80.4043 20.8636Z"
								fill="white"
							/>
							<path
								d="M87.7523 30.6591C86.8205 30.6591 86.0174 30.4811 85.3432 30.125C84.6727 29.7652 84.1557 29.25 83.7921 28.5795C83.4322 27.9053 83.2523 27.0985 83.2523 26.1591C83.2523 25.2576 83.4341 24.4697 83.7977 23.7955C84.1614 23.1212 84.6746 22.5966 85.3375 22.2216C86.0004 21.8466 86.7826 21.6591 87.6841 21.6591C88.3432 21.6591 88.9398 21.7614 89.4739 21.9659C90.008 22.1705 90.4644 22.4678 90.8432 22.858C91.222 23.2443 91.5137 23.714 91.7182 24.267C91.9227 24.8201 92.025 25.4432 92.025 26.1364V26.8636H84.2296V25.1364H89.1387C89.1349 24.8864 89.0705 24.6667 88.9455 24.4773C88.8243 24.2841 88.6595 24.1345 88.4512 24.0284C88.2466 23.9186 88.0137 23.8636 87.7523 23.8636C87.4985 23.8636 87.2656 23.9186 87.0534 24.0284C86.8413 24.1345 86.6709 24.2822 86.5421 24.4716C86.4171 24.661 86.3508 24.8826 86.3432 25.1364V27C86.3432 27.2803 86.4019 27.5303 86.5193 27.75C86.6368 27.9697 86.8053 28.142 87.025 28.267C87.2447 28.392 87.5099 28.4545 87.8205 28.4545C88.0364 28.4545 88.2334 28.4242 88.4114 28.3636C88.5932 28.303 88.7485 28.2159 88.8773 28.1023C89.0061 27.9848 89.1008 27.8447 89.1614 27.6818H92.025C91.9265 28.2879 91.6936 28.8144 91.3262 29.2614C90.9587 29.7045 90.472 30.0492 89.8659 30.2955C89.2637 30.5379 88.5591 30.6591 87.7523 30.6591Z"
								fill="white"
							/>
						</svg>
					</a>
				</Link>
				<menu className="font-bold flex gap-2 sm:gap-4">
					<Link href="/watchlist" className="flex items-center gap-2">
						<HeartHalf size={32} weight="duotone" />
						<span className="max-sm:sr-only">Watchlist</span>
					</Link>
					<Link href="/watchlist" className="flex items-center gap-2">
						<ShareFat size={32} weight="duotone" />
						<span className="max-sm:sr-only">Share</span>
					</Link>
				</menu>
			</nav>
		</>
	);
}
