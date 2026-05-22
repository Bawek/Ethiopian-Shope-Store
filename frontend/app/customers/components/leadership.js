'use client'
import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120 }
  }
}

const cardHover = {
  scale: 1.05,
  rotate: Math.random() > 0.5 ? 2 : -2,
  transition: { type: 'spring', stiffness: 300 }
}

const avatarHover = {
  scale: 1.1,
  rotate: Math.random() * 10 - 5,
  transition: { duration: 0.3 }
}
const myteam = [
    {
        name: 'Amare Zewudie',
        role: 'Admin',
        bio: 'Software Enginner',
        initials: 'AZ',
        image: '/images/about/amare.jpg'
    },
    {
        name: 'Mebrat Matebie',
        role: 'Team Member',
        bio: 'Software Enginner',
        initials: 'MM'
        ,
   image: '/images/about/mebrat.jpg'
    },
    {
        name: 'Baweke Mekonnen',
        role: 'Team Member',
        bio: 'Software Enginner',
        initials: 'BM',
   image: '/images/about/baweke.jpg'
    },
    {
        name: 'Birihanu Tadele',
        role: 'Team Member',
        bio: 'Software Enginner',
        initials: 'BT',
   image: '/images/about/birihanu.jpg'
    }
];

export default function TeamSection() {
    return (
        < section className="bg-gradient-to-b from-accent/30 to-background relative overflow-hidden" >
            <div className="container px-4 mx-auto py-20">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                    className="space-y-16"
                >
                    {/* Heading Section */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center space-y-4"
                    >
                        <motion.h2
                            className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, type: 'spring' }}
                        >
                            Visionary Leadership
                        </motion.h2>

                        <motion.p
                            className="text-muted-foreground max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            Meet the team driving Ethiopia's digital commerce revolution
                        </motion.p>
                    </motion.div>

                    {/* Team Grid */}
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                    >
                        {myteam.map((member) => (
                            <motion.div
                                key={member.name}
                                variants={itemVariants}
                                whileHover="hover"
                                className="group"
                            >
                                <motion.div
                                    whileHover={cardHover}
                                    whileTap={{ scale: 0.95 }}
                                    className="h-full"
                                >
                                    <Card className="h-full hover:shadow-xl transition-shadow backdrop-blur-sm bg-opacity-50">
                                        <CardContent className="p-6 flex flex-col items-center text-center">
                                            <motion.div
                                                whileHover={avatarHover}
                                                className="cursor-pointer"
                                            >
                                                <Avatar className="h-24 w-24 mb-6 border-4 border-primary/20">
                                                    <AvatarImage src={member.image} />
                                                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                                                        {member.initials}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </motion.div>

                                            <CardTitle className="text-xl font-semibold">
                                                {member.name}
                                            </CardTitle>

                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="mt-2 mb-3"
                                            >
                                                <Badge variant="outline" className="bg-primary/10">
                                                    {member.role}
                                                </Badge>
                                            </motion.div>

                                            <motion.p
                                                className="text-sm text-muted-foreground"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                {member.bio}
                                            </motion.p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>
            </div>
        </section >
    )
}
