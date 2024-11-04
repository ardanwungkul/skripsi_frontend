<script setup>
import Logo from '@/assets/images/logo.png'
</script>
<template>
    <div class="bg-[#09123A] w-full rounded-t-lg">
        <div class="max-w-6xl w-full mx-auto p-5">
            <!-- <div class="grid grid-cols-2 border-b pb-5 border-gray-500">
                <div class="flex items-center">
                    <p class="text-white text-2xl font-semibold">
                        Join Our Newslater
                    </p>
                </div>
                <div class="flex items-center gap-5">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        class="w-full rounded-lg" />
                    <router-link
                        :to="{ name: 'login' }"
                        class="px-5 py-2 uppercase tracking-widest font-medium text-sm rounded-lg text-white"
                        style="
                            background-image: linear-gradient(
                                180deg,
                                #ff9800 0%,
                                #ff6e00 100%
                            );
                        ">
                        Subscribe
                    </router-link>
                </div>
            </div> -->
            <div class="grid grid-cols-3 py-5">
                <div>
                    <img :src="Logo" alt="" class="pr-10 object-cover h-20" />
                    <p class="text-gray-300 text-sm">
                        JasaWebsite.Biz adalah jasa website bandung yang
                        menyediakan jasa pembuatan website baik untuk
                        perorangan, UKM, perusahaan swasta, BUMN dan jasa
                        website untuk pemerintahan.
                    </p>
                </div>
                <div class="space-y-5">
                    <div class="space-y-3">
                        <p class="text-white font-semibold text-xl">
                            Work Hours
                        </p>
                        <div class="flex items-center gap-3">
                            <i class="fa-light fa-clock text-[#ff9800]"></i>
                            <p class="text-white">
                                Senin - Jumat, 09:00 - 17:00
                            </p>
                        </div>
                    </div>
                    <div class="space-y-3">
                        <p class="text-white font-semibold text-xl">
                            Contact Us
                        </p>
                        <div class="flex items-center gap-3">
                            <i class="fa-light fa-phone text-[#ff9800]"></i>
                            <p class="text-white">+62 896-5223-6201</p>
                        </div>
                        <div class="flex items-center gap-3">
                            <i class="fa-light fa-envelope text-[#ff9800]"></i>
                            <p class="text-white">Jasawebsite.biz@gmail.com</p>
                        </div>
                    </div>
                </div>
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15841.497984185282!2d107.6388771!3d-6.9650722!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e84cea7d187f%3A0x2ea71ad0b2f5e182!2sJasawebsite.Biz%20-%20Jasa%20Pembuatan%20Website%20Bandung!5e0!3m2!1sen!2sid!4v1723783386377!5m2!1sen!2sid"
                        style="border: 0"
                        class="w-full h-full rounded-lg"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>
