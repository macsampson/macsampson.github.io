import { motion } from "framer-motion";

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-secondary hover:text-primary underline underline-offset-2 transition-colors text-sm"
  >
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
          src="/assets/images/profiles/pfp.jpg"
          alt="Mackenzie Sampson"
          className="w-24 h-24 rounded-full object-cover border border-secondary/20"
        />
        <div>
          <h1 className="font-bold text-3xl sm:text-4xl font-merriweather mb-1 text-primary">
            mackenzie sampson
          </h1>
          <p className="text-secondary italic mb-4">Technical Artist &amp; Software Engineer</p>
          <div className="flex flex-wrap gap-4">
            <SocialLink href="https://github.com/macsampson">GitHub</SocialLink>
            <SocialLink href="https://macsampson.artstation.com/">ArtStation</SocialLink>
            <SocialLink href="https://linkedin.com/in/macsampson">LinkedIn</SocialLink>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="text-base leading-relaxed text-primary/85 mb-4">
            I'm a Technical Artist and Software Engineer focused on graphics, pipelines, and
            AI-driven tooling. I hold a Computer Science degree from UBC and have shipped
            production pipelines at EA across FIFA titles on Nintendo Switch and Mobile Live
            Services.
          </p>
          <p className="text-base leading-relaxed text-primary/85">
            My current work sits at the intersection of rendering research and generative AI —
            I'm actively studying ray tracing and built Apparition.io, an end-to-end AI
            video generation pipeline using Stable Diffusion, LLaMA 3, Whisper, and FFmpeg.
          </p>
        </div>

        <div className="border-l border-secondary/20 pl-8">
          <div className="mb-5">
            <span className="text-xs uppercase tracking-widest text-secondary font-merriweather block mb-1.5">Education</span>
            <p className="text-sm font-semibold">University of British Columbia</p>
            <p className="text-sm text-primary/70">Bachelor of Computer Science</p>
          </div>
          <div className="h-px bg-secondary/15 my-4" />
          <SkillGroup title="Technical" skills="Houdini, Unreal Engine, Maya, Unity, Blender, Photoshop" />
          <SkillGroup title="Scripting" skills="Python, VEX, HLSL/GLSL, C#, C++" />
          <SkillGroup title="Shaders & Rendering" skills="Custom shader development, PBR material authoring, Real-time rendering, Unreal Material Editor" />
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
