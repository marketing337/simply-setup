import { Author } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, User } from "lucide-react";

interface AuthorCardProps {
  author: Author;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Card className="mt-8 border-l-4 border-l-primary">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Author Photo */}
          <div className="flex-shrink-0">
            {author.photo ? (
              <img 
                src={author.photo} 
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border-2 border-gray-200">
                <User className="w-8 h-8 text-primary" />
              </div>
            )}
          </div>

          {/* Author Details */}
          <div className="flex-1">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{author.name}</h3>
              {author.qualification && (
                <p className="text-sm text-gray-600 font-medium">{author.qualification}</p>
              )}
              {author.yearsOfExperience && (
                <p className="text-sm text-gray-500">
                  {author.yearsOfExperience} years of experience
                </p>
              )}
            </div>

            {author.bio && (
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {author.bio}
              </p>
            )}

            {author.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <a 
                  href={`mailto:${author.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {author.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}