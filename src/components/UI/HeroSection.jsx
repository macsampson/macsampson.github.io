import { motion } from "framer-motion";
import { Palette } from "lucide-react";

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" {...props}>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const SocialLink = ({ href, icon: Icon, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors text-sm"
  >
    <Icon size={14} />
    {children}
  </a>
);

const SkillGroup = ({ title, skills }) => (
  <div className="mb-3">
    <span className="text-xs uppercase tracking-widest text-secondary font-merriweather block mb-1.5">{title}</span>
    <p className="text-sm leading-relaxed text-primary/80">{skills}</p>
  </div>
);

const HeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="mb-20 pb-12 border-b border-secondary/20"
    >
      <div className="flex flex-col sm:flex-row items-start gap-8 mb-10">
        <img
          src="/assets/images/profiles/pfp.webp"
          alt="Mackenzie Sampson"
          className="w-24 h-24 rounded-full object-cover border border-secondary/20"
        />
        <div>
          <h1 className="font-bold text-3xl sm:text-4xl font-merriweather mb-1 text-primary">
            mackenzie sampson
          </h1>
          <p className="text-secondary italic mb-4">Technical Artist &amp; Software Engineer</p>
          <div className="flex flex-wrap gap-4">
            <SocialLink href="https://github.com/macsampson" icon={GithubIcon}>GitHub</SocialLink>
            <SocialLink href="https://macsampson.artstation.com/" icon={Palette}>ArtStation</SocialLink>
            <SocialLink href="https://linkedin.com/in/macsampson" icon={LinkedinIcon}>LinkedIn</SocialLink>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="text-base leading-relaxed text-primary/85 mb-4">
            I'm Mackenzie, a technical artist and software engineer who exists at the border between art tools and graphics programming.
          </p>
          <p className="text-base leading-relaxed text-primary/85 mb-4">
            My first job out of school was at EA, building Python pipelines in Maya for FIFA and the Ignite engine. After that I spent a couple of years building backend tooling for a small 3D-printed keycap business of my own.
          </p>
          <p className="text-base leading-relaxed text-primary/85">
            These days I split my time between artist-facing work like shaders, engine tools, and pipeline work, and going deeper into the rendering stack with C++, path tracing, and Vulkan.
          </p>
        </div>

        <div className="border-l border-secondary/20 pl-8">
          <div className="mb-5">
            <span className="text-xs uppercase tracking-widest text-secondary font-merriweather block mb-1.5">Education</span>
            <p className="text-sm font-semibold">University of British Columbia</p>
            <p className="text-sm text-primary/70">Bachelor of Computer Science</p>
          </div>
          <div className="h-px bg-secondary/15 my-4" />
          <SkillGroup title="Engines" skills="Unreal, Unity" />
          <SkillGroup title="DCC" skills="Maya, Blender, Houdini, Photoshop" />
          <SkillGroup title="Programming" skills="C++, C#, HLSL/GLSL, Python, JavaScript" />
          <SkillGroup title="Graphics" skills="PBR, path tracing, Vulkan" />
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
