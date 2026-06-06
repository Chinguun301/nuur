"use client";

import { motion } from "framer-motion";
import {
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  BadgeCheck,
  Languages,
  User,
  Heart,
  Target,
  Medal,
  Star,
  ChevronRight,
  Shield,
  BookOpen,
  IdCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const personalInfo = {
  name: "ВАНЧИНСҮРЭН ЧИНГҮҮН",
  title: "Front-end (Flutter) хөгжүүлэгч",
  phone: "95247512",
  email: "chinguunv@gmail.com",
  address: "Баянзүрх дүүрэг",
  dob: "2000-03-01",
  gender: "Эрэгтэй",
  maritalStatus: "Гэрлээгүй",
  registerNo: "УЗ00230111",
  driverLicense: "B",
};

const interestedPositions = [
  "Backend хөгжүүлэгч (Мэдээллийн технологи, программ хангамж)",
  "Frontend хөгжүүлэгч (Мэдээллийн технологи, программ хангамж)",
];

const workExperience = [
  {
    company: "И Клиник ХХК",
    position: "Front-end (Flutter) хөгжүүлэгч",
    period: "2026-03-08 - 2026-04-01",
    duration: "1 сар",
    description: "App хөгжүүлэлт, эмнэлгийн system хөгжүүлэлт",
    salary: "3,000,000 - 3,500,000₮",
    type: "Бүтэн цагийн",
  },
];

const education = [
  {
    school: "Шанхайн Шинжлэх Ухаан, Технологийн Их Сургууль",
    period: "2020 - 2024",
    degree: "Бакалавр",
    major: "Компьютерын ухаан",
    gpa: "3.3/4.0",
    location: "Хятад",
  },
  {
    school: "Зүүн Хятадын Шинжлэх Ухаан Технологийн Их Сургууль - Олон Улсын Хөтөлбөр",
    period: "2019 - 2020",
    degree: "Мэргэшсэн",
    gpa: "A",
    location: "Хятад",
  },
  {
    school: "Улс төрийн Шинжлэх Ухаан, Хуулийн Их Сургууль - Хэлний Бэлтгэл",
    period: "2018 - 2019",
    degree: "Мэргэшсэн",
    gpa: "A",
    location: "Хятад",
  },
  {
    school: "Улсын Тэргүүний Лаборатори 1 дүгээр Бүрэн Дунд Сургууль",
    period: "2007 - 2017",
    note: "Математикийн гүнзгийрүүлсэн сургалт",
    location: "Монгол",
  },
];

const certificates = [
  {
    name: "HSK 5 (Хятад хэлний түвшин)",
    status: "2024 оноос сурч байна",
  },
];

const awards = [
  {
    year: "2024",
    items: [
      "Шанхай хотын Монгол оюутны холбооноос зохион байгуулагддаг сагсан бөмбөгийн аварга шалгаруулах тэмцээн - Алтан медаль",
      "Шанхай хотын Янпу дүүрэг 3x3 сагсан бөмбөгийн аварга шалгаруулах тэмцээн - Мөнгөн медаль",
    ],
  },
  {
    year: "2018",
    items: [
      "Улсын тэргүүний лаборатори 1 дүгээр БДС-ийн сагсан бөмбөгийн аварга шалгаруулах тэмцээн - Алтан медаль",
      "Улсын тэргүүний лаборатори 1 дүгээр БДС-ийн гар бөмбөгийн аварга шалгаруулах тэмцээн - Мөнгөн, Алтан медаль",
      "Шанхай хотын ЗХ ШУТИХС-ийн гар, сагсан бөмбөгийн аварга шалгаруулах тэмцээн - Алтан, Хүрэл медаль",
    ],
  },
  {
    year: "2015",
    items: [
      "Улсын тэргүүний лаборатори 1 дүгээр БДС-ийн математикийн олимпиад - Мөнгөн медаль",
      "Улсын тэргүүний лаборатори 1 дүгээр БДС-ийн физикийн олимпиад - Хүрэл медаль",
    ],
  },
];

const skills = {
  personal: [
    { name: "Багаар ажиллах", icon: Heart },
    { name: "Хувийн сахилга бат", icon: Shield },
    { name: "Дасан зохицох", icon: Target },
  ],
  languages: [
    { name: "Англи хэл", level: "Ахисан шат", icon: Languages },
    { name: "Хятад хэл", level: "Бүрэн эзэмшсэн", icon: Languages },
  ],
  sports: [
    { name: "Сагсан бөмбөг", level: "Ахисан түвшний", icon: Star },
    { name: "Гар бөмбөг", level: "Ахисан түвшний", icon: Star },
  ],
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-8"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
      <h2 className="text-2xl font-bold text-center whitespace-nowrap">{children}</h2>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
    </motion.div>
  );
}

export default function ResumePage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ============ HERO / HEADER ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-16"
        >
          {/* Decorative background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl -z-10" />
          <div className="absolute -top-4 -right-4 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col lg:flex-row items-start gap-8 p-8 lg:p-12">
            {/* Avatar placeholder */}
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-white">Ч</span>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-2">
                {personalInfo.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">{personalInfo.title}</p>

              {/* Quick info chips */}
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/5 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  {personalInfo.phone}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/5 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {personalInfo.email}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/5 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {personalInfo.address}
                </div>
              </div>
            </div>

            <Button size="lg" className="rounded-full shrink-0" onClick={() => window.print()}>
              <Download className="mr-2 h-4 w-4" />
              CV Татах
            </Button>
          </div>
        </motion.div>

        {/* ============ PROFILE ============ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <SectionTitle>Мэргэжлийн хөрөө</SectionTitle>
          <Card className="p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                <User className="h-5 w-5 text-blue-500" />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Хариуцлагатай, зохион байгуулалт сайтай, харилцааны ур чадвартай. Аливаа ажлыг цаг
                хугацаанд нь чанартай гүйцэтгэхийг эрхэмлэдэг бөгөөд шинэ мэдлэг, туршлага
                хуримтлуулахыг эрмэлздэг.
              </p>
            </div>
          </Card>
        </motion.section>

        {/* ============ PERSONAL INFO GRID ============ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionTitle>Ерөнхий мэдээлэл</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Төрсөн огноо", value: personalInfo.dob, icon: Calendar },
              { label: "Хүйс", value: personalInfo.gender, icon: User },
              { label: "Гэрлэлтийн байдал", value: personalInfo.maritalStatus, icon: Heart },
              { label: "Регистрийн дугаар", value: personalInfo.registerNo, icon: IdCard },
              { label: "Жолооны үнэмлэх", value: personalInfo.driverLicense, icon: BadgeCheck },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium truncate">{item.value}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============ INTERESTED POSITIONS ============ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionTitle>Сонирхож буй ажлын байр</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {interestedPositions.map((pos, idx) => (
              <motion.div
                key={pos}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Target className="h-4 w-4 text-purple-500" />
                  </div>
                  <p className="text-sm font-medium">{pos}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ============ WORK EXPERIENCE ============ */}
        <section className="mb-16">
          <SectionTitle>Ажлын туршлага</SectionTitle>
          <div className="space-y-6">
            {workExperience.map((work, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <Briefcase className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{work.position}</h3>
                        <Badge variant="secondary" className="w-fit">
                          {work.duration}
                        </Badge>
                      </div>
                      <p className="text-base text-primary font-medium mb-3">{work.company}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {work.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <BadgeCheck className="h-3.5 w-3.5" />
                          {work.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{work.description}</p>
                      <p className="text-sm font-medium text-foreground">
                        Цалингийн хүлээлт: {work.salary}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ EDUCATION ============ */}
        <section className="mb-16">
          <SectionTitle>Боловсрол</SectionTitle>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{edu.school}</h3>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {edu.period}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {edu.location}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {edu.degree && <Badge variant="outline">{edu.degree}</Badge>}
                        {edu.major && <Badge variant="outline">{edu.major}</Badge>}
                        {edu.gpa && <Badge variant="secondary">Голч: {edu.gpa}</Badge>}
                        {edu.note && <Badge variant="outline">{edu.note}</Badge>}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ CERTIFICATES ============ */}
        <section className="mb-16">
          <SectionTitle>Шалгалт, тест</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certificates.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-4 w-4 text-amber-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{cert.name}</p>
                    <p className="text-xs text-muted-foreground">{cert.status}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ AWARDS ============ */}
        <section className="mb-16">
          <SectionTitle>Шагнал, урамшуулал</SectionTitle>
          <div className="space-y-6">
            {awards.map((group, idx) => (
              <motion.div
                key={group.year}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="p-6 lg:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Medal className="h-5 w-5 text-amber-500" />
                    </div>
                    <h3 className="text-xl font-bold">{group.year}</h3>
                  </div>
                  <ul className="space-y-3">
                    {group.items.map((item, iidx) => (
                      <li key={iidx} className="flex items-start gap-3">
                        <ChevronRight className="h-4 w-4 text-amber-500 mt-1 shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ SKILLS ============ */}
        <section className="mb-16">
          <SectionTitle>Үр чадвар</SectionTitle>

          {/* Personal Skills */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              Хувийн ур чадвар
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {skills.personal.map((skill, idx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-4 text-center">
                    <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center mx-auto mb-3">
                      <skill.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm font-medium">{skill.name}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Languages className="h-4 w-4 text-blue-500" />
              Гадаад хэлний мэдлэг
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.languages.map((lang, idx) => (
                <motion.div
                  key={lang.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-4 flex items-center justify-between">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <Badge variant="secondary">{lang.level}</Badge>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sports */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              Спортын ур чадвар
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.sports.map((sport, idx) => (
                <motion.div
                  key={sport.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-4 flex items-center justify-between">
                    <span className="text-sm font-medium">{sport.name}</span>
                    <Badge variant="secondary">{sport.level}</Badge>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
